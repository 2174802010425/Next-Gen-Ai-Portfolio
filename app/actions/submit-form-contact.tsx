"use server";

import { serverClient } from "@/sanity/lib/serverClient";

export async function submitContactForm(formData: FormData) {
  try {
    if (!process.env.SANITY_SERVER_API_KEY) {
      console.error("submitContactForm: missing SANITY_SERVER_API_KEY");
      return {
        success: false,
        error: "Thiếu SANITY_SERVER_API_KEY (server key) để ghi lên Sanity.",
      };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validate the required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    // Create the document in Sanity
    const result = await serverClient.create(
      {
        _type: "contact",
        name,
        email,
        subject,
        message,
        submittedAt: new Date().toISOString(),
        status: "new",
      },
      { autoGenerateArrayKeys: true },
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error:
        (error as Error)?.message ||
        "Failed to submit the form. Please try again later.",
    };
  }
}