export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContact = () => {
  const { fetchApi } = useApi();
  const sending = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  const submitContact = async (form: ContactForm): Promise<boolean> => {
    sending.value = true;
    error.value = null;
    success.value = false;

    try {
      await fetchApi<{ message: string }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      success.value = true;
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to send message";
      console.error("Error submitting contact form:", e);
      return false;
    } finally {
      sending.value = false;
    }
  };

  return {
    sending,
    error,
    success,
    submitContact,
  };
};
