import { MOCK_PACKAGES_INTERFACE } from ".";

export const MOCK_PACKAGES: MOCK_PACKAGES_INTERFACE[] = [
  {
    id: "std_http",
    name: "http",
    version: "1.2.4",
    downloads: 45231,
    description:
      "Standard HTTP client and server implementation for Cyrus with TLS support.",
    updated: "2 days ago",
    dependencies: ["vortex", "cy_crypto", "log_fmt"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "json_parser",
    name: "json_ser",
    version: "0.9.1",
    downloads: 12840,
    description:
      "High-performance JSON serialization and deserialization using zero-copy parsing.",
    updated: "1 week ago",
    dependencies: ["num_lib"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "cyrus_ui",
    name: "cyrus_ui",
    version: "2.0.0",
    downloads: 8420,
    description:
      "Native UI toolkit for building cross-platform desktop apps with GPU acceleration.",
    updated: "5 hours ago",
    dependencies: ["vortex", "log_fmt"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "cyrus_sql",
    name: "sql_driver",
    version: "1.1.0",
    downloads: 22410,
    description:
      "Unified interface for PostgreSQL, MySQL, and SQLite databases.",
    updated: "3 days ago",
    dependencies: ["vortex", "cy_crypto", "log_fmt"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "crypto_core",
    name: "cy_crypto",
    version: "0.5.2",
    downloads: 15730,
    description:
      "Modern cryptographic primitives including AES-GCM and ChaCha20-Poly1305.",
    updated: "2 weeks ago",
    dependencies: ["num_lib"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "logger_pro",
    name: "log_fmt",
    version: "1.0.1",
    downloads: 30112,
    description:
      "Structured logging with support for JSON, console colors, and rotation.",
    updated: "1 month ago",
    dependencies: [],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "async_runtime",
    name: "vortex",
    version: "3.4.0",
    downloads: 50390,
    description:
      "A high-performance asynchronous runtime for Cyrus based on the M:N scheduler.",
    updated: "1 day ago",
    dependencies: [],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "math_utils",
    name: "num_lib",
    version: "0.8.0",
    downloads: 5340,
    description:
      "Scientific computing library with support for linear algebra and complex numbers.",
    updated: "6 days ago",
    dependencies: [],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "toml_config",
    name: "toml_parser",
    version: "1.2.0",
    downloads: 10420,
    description:
      "A lightweight TOML configuration file parser for Cyrus applications.",
    updated: "4 days ago",
    dependencies: ["json_ser"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
  {
    id: "test_runner",
    name: "cy_test",
    version: "2.1.1",
    downloads: 18760,
    description:
      "Built-in testing framework with mock support and coverage reporting.",
    updated: "12 hours ago",
    dependencies: ["vortex", "log_fmt"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
];
