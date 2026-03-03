"use client";

import React, { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { autocomplete } from "@/config/google";
import { sendQuoteNotification } from "@/lib/quo";

type QuoteFormData = {
    fullName: string;
    address: string;
    email: string;
    phone: string;
    notes: string;
};

type AutocompleteSuggestion = {
    placePrediction?: {
        placeId?: string;
        text?: {
            text?: string;
        };
        structuredFormat?: {
            mainText?: {
                text?: string;
            };
            secondaryText?: {
                text?: string;
            };
        };
    };
};

const initialForm: QuoteFormData = {
    fullName: "",
    address: "",
    email: "",
    phone: "",
    notes: "",
};

export default function Page() {
    const [form, setForm] = useState<QuoteFormData>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();
    const [addressQuery, setAddressQuery] = useState("");
    const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addressWrapperRef = useRef<HTMLDivElement | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const updateField = (field: keyof QuoteFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 10);

        if (digits.length < 4) return digits;
        if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    };

    const getSuggestionLabel = (suggestion: AutocompleteSuggestion) => {
        return (
            suggestion.placePrediction?.text?.text ||
            suggestion.placePrediction?.structuredFormat?.mainText?.text ||
            ""
        );
    };

    const getSuggestionSecondary = (suggestion: AutocompleteSuggestion) => {
        return suggestion.placePrediction?.structuredFormat?.secondaryText?.text || "";
    };

    const hasAddress = useMemo(() => form.address.trim().length > 0, [form.address]);

    useEffect(() => {
        if (!addressQuery.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            startTransition(async () => {
                const result = await autocomplete(addressQuery);
                setSuggestions(Array.isArray(result) ? result : []);
                setShowSuggestions(true);
            });
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [addressQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!addressWrapperRef.current) return;
            if (!addressWrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddressChange = (value: string) => {
        updateField("address", value);
        setAddressQuery(value);
    };

    const handleSelectSuggestion = (suggestion: AutocompleteSuggestion) => {
        const primary = getSuggestionLabel(suggestion);

        updateField("address", primary);
        setAddressQuery(primary);
        setShowSuggestions(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            await sendQuoteNotification({
                fullName: form.fullName,
                address: form.address,
                email: form.email,
                phone: form.phone,
                notes: form.notes,
            });
            setSubmitMessage("Your quote request has been received. We’ll reach out shortly.");
            setForm(initialForm);
            setAddressQuery("");
            setSuggestions([]);
            setShowSuggestions(false);
        } catch (error) {
            setSubmitMessage("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-3xl font-semibold tracking-tight">
                            Request a Pool Service Quote
                        </CardTitle>
                        <CardDescription className="text-base">
                            Tell us where you are and how to reach you. Krystal Clean Pool Service will follow up with pricing and next steps.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="fullName">Homeowner Name</Label>
                                    <Input
                                        id="fullName"
                                        placeholder="John Smith"
                                        value={form.fullName}
                                        onChange={(e) => updateField("fullName", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2" ref={addressWrapperRef}>
                                    <Label htmlFor="address">Service Address</Label>
                                    <div className="relative">
                                        <Input
                                            id="address"
                                            placeholder="Start typing your address"
                                            value={form.address}
                                            onChange={(e) => handleAddressChange(e.target.value)}
                                            onFocus={() => {
                                                if (suggestions.length > 0) setShowSuggestions(true);
                                            }}
                                            autoComplete="off"
                                            required
                                        />

                                        {showSuggestions && (suggestions.length > 0 || isPending) && (
                                            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border bg-background shadow-md">
                                                {isPending && suggestions.length === 0 ? (
                                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                                        Searching addresses...
                                                    </div>
                                                ) : (
                                                    <div className="max-h-72 overflow-y-auto py-1">
                                                        {suggestions.map((suggestion, index) => {
                                                            const primary = getSuggestionLabel(suggestion);
                                                            const secondary = getSuggestionSecondary(suggestion);
                                                            const key = suggestion.placePrediction?.placeId || `${primary}-${index}`;

                                                            return (
                                                                <button
                                                                    key={key}
                                                                    type="button"
                                                                    className="flex w-full flex-col px-3 py-2 text-left hover:bg-muted"
                                                                    onClick={() => handleSelectSuggestion(suggestion)}
                                                                >
                                                                    <span className="text-sm font-medium">{primary}</span>
                                                                    {secondary && (
                                                                        <span className="text-xs text-muted-foreground">{secondary}</span>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Address suggestions are powered by Google Places.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(555) 555-5555"
                                        value={form.phone}
                                        onChange={(e) => updateField("phone", formatPhone(e.target.value))}
                                        autoComplete="tel"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Tell us anything helpful about your pool, gate access, green pool, equipment issues, or service needs."
                                        value={form.notes}
                                        onChange={(e) => updateField("notes", e.target.value)}
                                        className="min-h-28"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full rounded-xl"
                                disabled={isSubmitting || !hasAddress}
                            >
                                {isSubmitting ? "Submitting..." : "Request My Quote"}
                            </Button>

                            {submitMessage && (
                                <p className="text-sm font-medium text-slate-700">{submitMessage}</p>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
