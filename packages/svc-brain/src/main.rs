use axum::{routing::get, Router};

async fn health_check() -> &'static str {
    "Service 'svc-brain' is healthy!"
}

#[tokio::main]
async fn main() {
    // Build our application with a single /health route
    let app = Router::new().route("/health", get(health_check));

    println!("Rust 'Brain' service starting on http://0.0.0.0:8081");

    // Bind to the port
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081")
        .await
        .unwrap();

    axum::serve(listener, app).await.unwrap();
}