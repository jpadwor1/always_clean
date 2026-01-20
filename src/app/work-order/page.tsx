import React from 'react'

export const metadata = {
    title: "Florence Gardens Work Order | Krystal Clean Pools",
    description:
        "Submit a work order request for Florence Gardens pool & spa service.",
};

function Page() {
    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Florence Gardens Work Order Request
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Use this form to submit non-emergency maintenance or repair requests.
                    If there is an immediate life/safety risk, call 911 first.
                </p>
            </header>

            <section className="rounded-2xl border bg-background shadow-sm">
                {/* Responsive iframe wrapper */}
                <div className="w-full">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfTkRK-EdlVnSI1UmQPoKifMyGCuUCFaP101aa6jozm4u9W6g/viewform?embedded=true"
                        title="Florence Gardens Work Order Form"
                        className="min-h-[600px] max-h-[800px] w-full rounded-2xl"
                    >
                        Loading…
                    </iframe>
                </div>
            </section>

            <footer className="mt-6 text-xs text-muted-foreground">
                If the form doesn’t load, try refreshing the page or opening it in a new
                tab.
            </footer>
        </main>
    )
}

export default Page