package my.todo.api.common;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ApiResponseTest {

    @Test
    void success_withData_setsSuccessTrueAndCodeOK() {
        ApiResponse<String> response = ApiResponse.success("hello");

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo("hello");
        assertThat(response.getCode()).isEqualTo("OK");
        assertThat(response.getMessage()).isNotBlank();
    }

    @Test
    void error_withCodeAndMessage_setsSuccessFalseAndNullData() {
        ApiResponse<Object> response = ApiResponse.error("TODO_NOT_FOUND", "찾을 수 없습니다.");

        assertThat(response.isSuccess()).isFalse();
        assertThat(response.getData()).isNull();
        assertThat(response.getCode()).isEqualTo("TODO_NOT_FOUND");
        assertThat(response.getMessage()).isEqualTo("찾을 수 없습니다.");
    }
}
