import { MOCK_PACKAGES_INTERFACE } from ".";

export const MOCK_PACKAGES_FA: MOCK_PACKAGES_INTERFACE[] = [
  {
    id: "std_http",
    name: "http",
    version: "1.2.4",
    downloads: 45231,
    description:
      "پیاده‌سازی استاندارد کلاینت و سرور HTTP برای Cyrus با پشتیبانی از TLS.",
    updated: "۲ روز پیش",
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
      "سریال‌سازی و دی‌سریال‌سازی JSON با کارایی بالا و پارس بدون کپی (zero-copy).",
    updated: "۱ هفته پیش",
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
      "ابزارکیت رابط کاربری بومی برای ساخت اپلیکیشن‌های دسکتاپ چندسکویی با شتاب GPU.",
    updated: "۵ ساعت پیش",
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
      "رابط یکپارچه برای پایگاه‌داده‌های PostgreSQL، MySQL و SQLite.",
    updated: "۳ روز پیش",
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
      "الگوریتم‌های رمزنگاری مدرن شامل AES-GCM و ChaCha20-Poly1305.",
    updated: "۲ هفته پیش",
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
      "لاگ‌گیری ساخت‌یافته با پشتیبانی از JSON، رنگ‌بندی کنسول و چرخش فایل‌ها.",
    updated: "۱ ماه پیش",
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
      "ران‌تایم غیرهمزمان پرسرعت برای Cyrus مبتنی بر زمان‌بند M:N.",
    updated: "۱ روز پیش",
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
      "کتابخانه محاسبات علمی با پشتیبانی از جبر خطی و اعداد مختلط.",
    updated: "۶ روز پیش",
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
      "پارس‌کننده سبک فایل‌های تنظیمات TOML برای برنامه‌های Cyrus.",
    updated: "۴ روز پیش",
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
      "فریم‌ورک تست داخلی با پشتیبانی از mock و گزارش پوشش کد.",
    updated: "۱۲ ساعت پیش",
    dependencies: ["vortex", "log_fmt"],
    license: "MIT",
    author: "Cyrus Core Team",
  },
];
