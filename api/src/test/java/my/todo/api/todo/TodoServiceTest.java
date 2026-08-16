package my.todo.api.todo;

import my.todo.api.exception.TodoNotFoundException;
import my.todo.api.todo.dto.TodoCreateRequest;
import my.todo.api.todo.dto.TodoResponse;
import my.todo.api.todo.dto.TodoUpdateRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    private TodoService service() {
        return new TodoService(todoRepository);
    }

    @Test
    void create_savesAndReturnsTodoResponse() {
        TodoCreateRequest request = new TodoCreateRequest(
                "장보기", "우유 사기", Category.PERSONAL, Priority.HIGH, LocalDate.of(2026, 8, 20));
        Todo saved = new Todo("장보기", "우유 사기", Category.PERSONAL, Priority.HIGH, LocalDate.of(2026, 8, 20));
        given(todoRepository.save(any(Todo.class))).willReturn(saved);

        TodoResponse response = service().create(request);

        assertThat(response.title()).isEqualTo("장보기");
        assertThat(response.description()).isEqualTo("우유 사기");
        assertThat(response.category()).isEqualTo(Category.PERSONAL);
        assertThat(response.priority()).isEqualTo(Priority.HIGH);
        assertThat(response.dueDate()).isEqualTo(LocalDate.of(2026, 8, 20));
    }

    @Test
    void getAll_returnsAllTodosAsResponses() {
        given(todoRepository.findAll()).willReturn(List.of(
                new Todo("장보기", "우유 사기", null, null, null),
                new Todo("청소하기", null, null, null, null)
        ));

        List<TodoResponse> responses = service().getAll();

        assertThat(responses).hasSize(2);
    }

    @Test
    void getOne_returnsTodoResponse_whenExists() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);
        given(todoRepository.findById(1L)).willReturn(Optional.of(todo));

        TodoResponse response = service().getOne(1L);

        assertThat(response.title()).isEqualTo("장보기");
    }

    @Test
    void getOne_throwsTodoNotFoundException_whenNotExists() {
        given(todoRepository.findById(999L)).willReturn(Optional.empty());

        assertThatThrownBy(() -> service().getOne(999L))
                .isInstanceOf(TodoNotFoundException.class);
    }

    @Test
    void update_updatesAllMutableFields_whenExists() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);
        given(todoRepository.findById(1L)).willReturn(Optional.of(todo));

        TodoResponse response = service().update(1L, new TodoUpdateRequest(
                "장보기 완료", "우유+계란", Category.WORK, Priority.LOW, LocalDate.of(2026, 9, 1)));

        assertThat(response.title()).isEqualTo("장보기 완료");
        assertThat(response.description()).isEqualTo("우유+계란");
        assertThat(response.category()).isEqualTo(Category.WORK);
        assertThat(response.priority()).isEqualTo(Priority.LOW);
        assertThat(response.dueDate()).isEqualTo(LocalDate.of(2026, 9, 1));
    }

    @Test
    void update_throwsTodoNotFoundException_whenNotExists() {
        given(todoRepository.findById(999L)).willReturn(Optional.empty());

        assertThatThrownBy(() -> service().update(999L, new TodoUpdateRequest("t", "d", null, null, null)))
                .isInstanceOf(TodoNotFoundException.class);
    }

    @Test
    void delete_deletesTodo_whenExists() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);
        given(todoRepository.findById(1L)).willReturn(Optional.of(todo));

        service().delete(1L);

        verify(todoRepository, times(1)).delete(todo);
    }

    @Test
    void delete_throwsTodoNotFoundException_whenNotExists() {
        given(todoRepository.findById(999L)).willReturn(Optional.empty());

        assertThatThrownBy(() -> service().delete(999L))
                .isInstanceOf(TodoNotFoundException.class);
        verify(todoRepository, never()).delete(any());
    }

    @Test
    void toggle_flipsCompletedStatus_whenExists() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);
        given(todoRepository.findById(1L)).willReturn(Optional.of(todo));

        TodoResponse response = service().toggle(1L);

        assertThat(response.completed()).isTrue();
    }

    @Test
    void toggle_throwsTodoNotFoundException_whenNotExists() {
        given(todoRepository.findById(999L)).willReturn(Optional.empty());

        assertThatThrownBy(() -> service().toggle(999L))
                .isInstanceOf(TodoNotFoundException.class);
    }
}
