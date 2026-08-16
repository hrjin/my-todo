package my.todo.api.todo;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class TodoTest {

    @Test
    void constructor_setsTitleAndDescriptionAndCompletedFalse() {
        Todo todo = new Todo("장보기", "우유 사기", Category.PERSONAL, Priority.HIGH, LocalDate.of(2026, 8, 20));

        assertThat(todo.getTitle()).isEqualTo("장보기");
        assertThat(todo.getDescription()).isEqualTo("우유 사기");
        assertThat(todo.isCompleted()).isFalse();
        assertThat(todo.getCategory()).isEqualTo(Category.PERSONAL);
        assertThat(todo.getPriority()).isEqualTo(Priority.HIGH);
        assertThat(todo.getDueDate()).isEqualTo(LocalDate.of(2026, 8, 20));
    }

    @Test
    void constructor_defaultsPriorityToMedium_whenPriorityNull() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);

        assertThat(todo.getPriority()).isEqualTo(Priority.MEDIUM);
        assertThat(todo.getCategory()).isNull();
        assertThat(todo.getDueDate()).isNull();
    }

    @Test
    void toggleCompleted_flipsCompletedState() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);

        todo.toggleCompleted();
        assertThat(todo.isCompleted()).isTrue();

        todo.toggleCompleted();
        assertThat(todo.isCompleted()).isFalse();
    }

    @Test
    void toggleCompleted_updatesUpdatedAt() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);

        todo.toggleCompleted();

        assertThat(todo.getUpdatedAt()).isNotNull();
    }

    @Test
    void update_changesAllMutableFields() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);

        todo.update("장보기 완료", "우유+계란", Category.WORK, Priority.LOW, LocalDate.of(2026, 9, 1));

        assertThat(todo.getTitle()).isEqualTo("장보기 완료");
        assertThat(todo.getDescription()).isEqualTo("우유+계란");
        assertThat(todo.getCategory()).isEqualTo(Category.WORK);
        assertThat(todo.getPriority()).isEqualTo(Priority.LOW);
        assertThat(todo.getDueDate()).isEqualTo(LocalDate.of(2026, 9, 1));
    }

    @Test
    void update_defaultsPriorityToMedium_whenPriorityNull() {
        Todo todo = new Todo("장보기", "우유 사기", null, Priority.HIGH, null);

        todo.update("장보기 완료", "우유+계란", null, null, null);

        assertThat(todo.getPriority()).isEqualTo(Priority.MEDIUM);
    }

    @Test
    void update_updatesUpdatedAt() {
        Todo todo = new Todo("장보기", "우유 사기", null, null, null);

        todo.update("장보기 완료", "우유+계란", null, null, null);
        var firstUpdatedAt = todo.getUpdatedAt();
        todo.update("다시 수정", "설명 변경", null, null, null);
        var secondUpdatedAt = todo.getUpdatedAt();

        assertThat(secondUpdatedAt).isAfterOrEqualTo(firstUpdatedAt);
    }
}
