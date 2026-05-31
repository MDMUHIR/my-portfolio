export const useContact = () => {
  const { request } = useApi();
  const sending = ref(false);
  const error = ref(null);
  const success = ref(false);

  const submitContact = async (form) => {
    sending.value = true;
    error.value = null;
    success.value = false;

    try {
      await request({
        url: "/api/contact",
        method: "POST",
        data: form,
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
