const Environments = {
  dev: {
    catchErrors: "alway",
    API_URL: "https://hco.dalatcowork.com/",
    STORAGE_URL: "https://hco.dalatcowork.com/api/services/app/File/",
  },
  test: {
    catchErrors: "alway",
    API_URL: "https://hco.dalatcowork.com/",
    STORAGE_URL: "https://hco.dalatcowork.com/api/services/app/File/",
  },
  staging: {
    catchErrors: "alway",
    API_URL: "https://hco.dalatcowork.com/",
    STORAGE_URL: "https://hco.dalatcowork.com/api/services/app/File/",
  },
  prod: {
    catchErrors: "alway",
    API_URL: "https://hco.dalatcowork.com",
    STORAGE_URL: "https://dms-api.tapdoandaiviet.com.vn/api/services/app/File/",
  },
}

export const configOf = (env: string) => {
  return Environments[env]
}
