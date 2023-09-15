"use client";
import ResponsiveAppBar from "@/app/components/ResponsiveAppBar";
import FormikForm from "./components/FormikForm";

export default function Login() {

  return (
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
            <FormikForm />
          </main>
        </div>
  );
}
