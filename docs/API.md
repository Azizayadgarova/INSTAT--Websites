# API qatlami

Butun sayt kontenti bitta backend endpointdan oziqlanadi:

```
GET {VITE_API_URL}/site-data/items/all/
```

## Element strukturasi

Har element: `{ id, module, type, key, label, value, value_uz, value_ru, value_en, path }`

## Type mantiqlari

| type | value | value_uz/ru/en | path |
|---|---|---|---|
| `string` | asosiy matn/HTML | tilga xos matn | — |
| `file` | null | null | rasm yoki PDF URL |
| `link` | URL | ko'rsatiladigan matn | — |

## Module -> sahifa xaritasi

| module | sahifa(lar) |
|---|---|
| all | Navbar/Footer kontaktlari, Tuzilma manzili |
| about | UmumiyMalumot |
| structure | Tuzilma (diagramma rasmi) |
| corruption | QarshiKurash |
| odob | OdobAxloq (PDF) |
| hotel | Yotoqxona |
| science | IlmiyTadqiqot, OliyTalim |
| press | Hamkorlik |
| info_resource | 7 ta Axborot havola sahifasi |
| education | OnlaynTalim statistika raqamlari |

## Xususiyatlar

- Kesh + request dedup: butun sayt bir marta so'raydi.
- Til fallback: value_<lang> bo'lmasa value.
- Kontent fallback: API javob bermasa statik qiymatlar ko'rsatiladi.
- XSS himoyasi: barcha backend HTML DOMPurify orqali tozalanadi.
- VITE_API_URL orqali test/prod almashtirish.
