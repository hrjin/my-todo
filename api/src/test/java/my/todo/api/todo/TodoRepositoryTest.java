package my.todo.api.todo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    void save_persistsEntityAndSetsCreatedAtUpdatedAt() {
        Todo saved = todoRepository.save(new Todo("장보기", "우유 사기", null, null, null));

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();
    }

    @Test
    void save_persistsCategoryAndDueDate() {
        Todo saved = todoRepository.save(
                new Todo("장보기", "우유 사기", Category.PERSONAL, Priority.HIGH, LocalDate.of(2026, 8, 20)));

        Todo found = todoRepository.findById(saved.getId()).orElseThrow();

        assertThat(found.getCategory()).isEqualTo(Category.PERSONAL);
        assertThat(found.getPriority()).isEqualTo(Priority.HIGH);
        assertThat(found.getDueDate()).isEqualTo(LocalDate.of(2026, 8, 20));
    }

    @Test
    void findAll_returnsSavedTodos() {
        todoRepository.save(new Todo("장보기", "우유 사기", null, null, null));
        todoRepository.save(new Todo("청소하기", null, null, null, null));

        List<Todo> todos = todoRepository.findAll();

        assertThat(todos).hasSize(2);
    }

    @Test
    void findById_returnsEmptyWhenNotExists() {
        Optional<Todo> found = todoRepository.findById(999L);

        assertThat(found).isEmpty();
    }
}
