package my.todo.api.todo;

import jakarta.validation.Valid;
import my.todo.api.common.ApiResponse;
import my.todo.api.todo.dto.TodoCreateRequest;
import my.todo.api.todo.dto.TodoResponse;
import my.todo.api.todo.dto.TodoUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TodoResponse>> create(@Valid @RequestBody TodoCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(todoService.create(request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TodoResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(todoService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TodoResponse>> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(todoService.getOne(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TodoResponse>> update(@PathVariable Long id, @Valid @RequestBody TodoUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(todoService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        todoService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<TodoResponse>> toggle(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(todoService.toggle(id)));
    }
}
