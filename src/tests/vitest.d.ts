/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference types="vitest" />
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
    interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
    interface AsymmetricMatchersContaining
        extends TestingLibraryMatchers<any, void> {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */
