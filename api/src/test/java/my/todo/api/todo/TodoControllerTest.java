package my.todo.api.todo;

import tools.jackson.databind.ObjectMapper;
import my.todo.api.exception.TodoNotFoundException;
import my.todo.api.todo.dto.TodoCreateRequest;
import my.todo.api.todo.dto.TodoResponse;
import my.todo.api.todo.dto.TodoUpdateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TodoService todoService;

    private TodoResponse sampleResponse() {
        return new TodoResponse(1L, "장보기", "우유 사기", false, LocalDateTime.now(), LocalDateTime.now());
    }

    @Test
    void createTodo_returns201AndApiResponseSuccess() throws Exception {
        given(todoService.create(any())).willReturn(sampleResponse());

        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TodoCreateRequest("장보기", "우유 사기"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("장보기"));
    }

    @Test
    void createTodo_returns400_whenTitleBlank() throws Exception {
        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TodoCreateRequest("", null))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void getAllTodos_returns200AndList() throws Exception {
        given(todoService.getAll()).willReturn(List.of(sampleResponse()));

        mockMvc.perform(get("/api/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(1));
    }

    @Test
    void getTodo_returns200_whenExists() throws Exception {
        given(todoService.getOne(1L)).willReturn(sampleResponse());

        mockMvc.perform(get("/api/todos/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(1));
    }

    @Test
    void getTodo_returns404AndErrorCode_whenNotExists() throws Exception {
        given(todoService.getOne(999L)).willThrow(new TodoNotFoundException(999L));

        mockMvc.perform(get("/api/todos/{id}", 999L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.code").value("TODO_NOT_FOUND"));
    }

    @Test
    void updateTodo_returns200_whenExists() throws Exception {
        given(todoService.update(anyLong(), any())).willReturn(sampleResponse());

        mockMvc.perform(put("/api/todos/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TodoUpdateRequest("장보기 완료", "우유+계란"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void deleteTodo_returns200_whenExists() throws Exception {
        mockMvc.perform(delete("/api/todos/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void toggleTodo_returns200AndFlippedStatus() throws Exception {
        TodoResponse toggled = new TodoResponse(1L, "장보기", "우유 사기", true, LocalDateTime.now(), LocalDateTime.now());
        given(todoService.toggle(1L)).willReturn(toggled);

        mockMvc.perform(patch("/api/todos/{id}/toggle", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.completed").value(true));
    }
}
