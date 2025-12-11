import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// После каждого теста очищаем DOM, чтобы тесты не мешали друг другу
afterEach(() => {
    cleanup();
});
