class RequestLoggerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(
            f"[REQUEST] {request.method} {request.path}"
        )

        response = self.get_response(request)

        print(
            f"[RESPONSE] {response.status_code} "
            f"{request.method} {request.path}"
        )

        return response