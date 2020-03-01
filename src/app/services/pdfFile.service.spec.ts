import { TestBed } from "@angular/core/testing";

import { pdfFileService } from "./pdfFile.service";

describe("pdfFileService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: pdfFileService = TestBed.get(pdfFileService);
    expect(service).toBeTruthy();
  });
});
