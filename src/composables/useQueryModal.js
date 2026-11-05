import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * Ties a modal to a query parameter, so the back button closes it and the link
 * can be shared. Closing steps back when the entry before this one is the same
 * page without the parameter, and otherwise removes the parameter in place,
 * which covers shared links and arrivals from other pages.
 */
export function useQueryModal(key) {
  const route = useRoute();
  const router = useRouter();

  const value = computed(() => {
    const raw = route.query[key];
    return Array.isArray(raw) ? raw[0] : (raw ?? null);
  });

  function open(id) {
    router.push({ query: { ...route.query, [key]: id } });
  }

  function close() {
    const query = { ...route.query };
    delete query[key];
    const pageWithoutModal = router.resolve({ path: route.path, query }).fullPath;
    if (window.history.state?.back === pageWithoutModal) router.back();
    else router.replace({ query });
  }

  return { value, open, close };
}
