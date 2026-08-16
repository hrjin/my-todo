package my.todo.api.todo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import my.todo.api.todo.Category;
import my.todo.api.todo.Priority;

import java.time.LocalDate;

public record TodoCreateRequest(
        @NotBlank(message = "제목은 필수입니다.") @Size(max = 200) String title,
        @Size(max = 1000) String description,
        Category category,
        Priority priority,
        LocalDate dueDate
) {
}
