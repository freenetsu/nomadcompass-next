import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCountry } from "../useCountry";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

describe("useCountry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch country data successfully", async () => {
    const mockCountry = {
      id: "1",
      name: "Portugal",
      code: "PT",
      flag: "🇵🇹",
      continent: "Europe",
      data: {
        costOfLivingIndex: 52.5,
        safetyIndex: 73.2,
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCountry,
    });

    const { result } = renderHook(() => useCountry("1"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.country).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.country).toEqual(mockCountry);
    expect(result.current.error).toBe(null);
    expect(global.fetch).toHaveBeenCalledWith("/api/countries/1");
  });

  it("should handle 404 error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useCountry("999"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.country).toBe(null);
    expect(result.current.error).toBe("Pays non trouvé");
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useCountry("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.country).toBe(null);
    expect(result.current.error).toBe("Network error");
  });
});
