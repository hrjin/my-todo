package my.todo.api.todo;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TodoTest {

    @Test
    void constructor_setsTitleAndDescriptionAndCompletedFalse() {
        Todo todo = new Todo("장보기", "우유 사기");

        assertThat(todo.getTitle()).isEqualTo("장보기");
        assertThat(todo.getDescription()).isEqualTo("우유 사기");
        assertThat(todo.isCompleted()).isFalse();
    }

    @Test
    void toggleCompleted_flipsCompletedState() {
        Todo todo = new Todo("장보기", "우유 사기");

        todo.toggleCompleted();
        assertThat(todo.isCompleted()).isTrue();

        todo.toggleCompleted();
        assertThat(todo.isCompleted()).isFalse();
    }

    @Test
    void toggleCompleted_updatesUpdatedAt() {
        Todo todo = new Todo("장보기", "우유 사기");

        todo.toggleCompleted();

        assertThat(todo.getUpdatedAt()).isNotNull();
    }

    @Test
    void update_changesTitleAndDescription() {
        Todo todo = new Todo("장보기", "우유 사기");

        todo.update("장보기 완료", "우유+계란");

        assertThat(todo.getTitle()).isEqualTo("장보기 완료");
        assertThat(todo.getDescription()).isEqualTo("우유+계란");
    }

    @Test
    void update_updatesUpdatedAt() {
        Todo todo = new Todo("장보기", "우유 사기");

        todo.update("장보기 완료", "우유+계란");
        var firstUpdatedAt = todo.getUpdatedAt();
        todo.update("다시 수정", "설명 변경");
        var secondUpdatedAt = todo.getUpdatedAt();

        assertThat(secondUpdatedAt).isAfterOrEqualTo(firstUpdatedAt);
    }
}
