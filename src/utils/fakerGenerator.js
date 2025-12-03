import { faker } from "@faker-js/faker";

export const generateFakerValues = (type, format, count = 3) => {
    const values = [];

    for (let i = 0; i < count; i++) {
        let val = "";

        if (format === "email") {
            val = faker.internet.email();
        } else if (format === "date-time") {
            val = faker.date.recent().toISOString();
        } else if (format === "uuid") {
            val = faker.string.uuid();
        } else if (type === "integer" || type === "number") {
            val = String(faker.number.int({ min: 1, max: 100 }));
        } else if (type === "boolean") {
            val = i % 2 === 0 ? "true" : "false"; // true/false 골고루
        } else {
            // 기본 문자열
            val = faker.word.noun();
        }
        values.push(val);
    }

    return [...new Set(values)]; // 중복 제거
};