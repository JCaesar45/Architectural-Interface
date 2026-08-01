import org.springframework.web.bind.annotation.*;

public sealed interface ApiResponse<T> permits SuccessResponse, ErrorResponse {}

public record SuccessResponse<T>(String status, T data) implements ApiResponse<T> {
    public SuccessResponse(T data) {
        this("success", data);
    }
}

public record ErrorResponse(String status, int errorCode, String message) implements ApiResponse<Object> {
    public ErrorResponse(int errorCode, String message) {
        this("error", errorCode, message);
    }
}

public record ValidationData(String message) {}

@RestController
@RequestMapping("/api/v1")
public class ApiController {

    @PostMapping("/validate")
    public ApiResponse<ValidationData> validateEndpoint() {
        return new SuccessResponse<>(new ValidationData("Polyglot contract verified"));
    }
}
