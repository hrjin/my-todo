package my.todo.api.todo;

import my.todo.api.exception.TodoNotFoundException;
import my.todo.api.todo.dto.TodoCreateRequest;
import my.todo.api.todo.dto.TodoResponse;
import my.todo.api.todo.dto.TodoUpdateRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public TodoResponse create(TodoCreateRequest request) {
        Todo saved = todoRepository.save(new Todo(
                request.title(), request.description(), request.category(), request.priority(), request.dueDate()));
        return TodoResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<TodoResponse> getAll() {
        return todoRepository.findAll().stream()
                .map(TodoResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TodoResponse getOne(Long id) {
        return TodoResponse.from(findTodoOrThrow(id));
    }

    public TodoResponse update(Long id, TodoUpdateRequest request) {
        Todo todo = findTodoOrThrow(id);
        todo.update(request.title(), request.description(), request.category(), request.priority(), request.dueDate());
        return TodoResponse.from(todo);
    }

    public void delete(Long id) {
        Todo todo = findTodoOrThrow(id);
        todoRepository.delete(todo);
    }

    public TodoResponse toggle(Long id) {
        Todo todo = findTodoOrThrow(id);
        todo.toggleCompleted();
        return TodoResponse.from(todo);
    }

    private Todo findTodoOrThrow(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
    }
}
