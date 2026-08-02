package my.todo.api.todo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    void save_persistsEntityAndSetsCreatedAtUpdatedAt() {
        Todo saved = todoRepository.save(new Todo("장보기", "우유 사기"));

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();
    }

    @Test
    void findAll_returnsSavedTodos() {
        todoRepository.save(new Todo("장보기", "우유 사기"));
        todoRepository.save(new Todo("청소하기", null));

        List<Todo> todos = todoRepository.findAll();

        assertThat(todos).hasSize(2);
    }

    @Test
    void findById_returnsEmptyWhenNotExists() {
        Optional<Todo> found = todoRepository.findById(999L);

        assertThat(found).isEmpty();
    }
}
