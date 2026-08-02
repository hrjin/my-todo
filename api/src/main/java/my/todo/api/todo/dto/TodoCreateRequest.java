package my.todo.api.todo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TodoCreateRequest(
        @NotBlank(message = "제목은 필수입니다.") @Size(max = 200) String title,
        @Size(max = 1000) String description
) {
}
