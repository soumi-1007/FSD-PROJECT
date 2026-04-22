// ─── Storage Keys ───────────────────────────────────────────────────────────
const NOTES_KEY   = 'portal_notes_v2';
const TESTS_KEY   = 'portal_tests_v2';
const RESULTS_KEY = 'portal_results_v2';

// ─── Notes ───────────────────────────────────────────────────────────────────
export const getNotes = () => {
  const data = localStorage.getItem(NOTES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addNote = (note) => {
  const notes = getNotes();
  const updated = [...notes, { ...note, id: Date.now() }];
  localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  return updated;
};

// ─── Tests ───────────────────────────────────────────────────────────────────
export const getTests = () => {
  const data = localStorage.getItem(TESTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addTest = (test) => {
  const tests = getTests();
  const newTest = {
    ...test,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  const updated = [...tests, newTest];
  localStorage.setItem(TESTS_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteTest = (testId) => {
  const updated = getTests().filter(t => t.id !== testId);
  localStorage.setItem(TESTS_KEY, JSON.stringify(updated));
  return updated;
};

// ─── Results ─────────────────────────────────────────────────────────────────
export const getResults = () => {
  const data = localStorage.getItem(RESULTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveResult = (result) => {
  const results = getResults();
  // If already attempted, update, else add new
  const existing = results.findIndex(
    r => r.testId === result.testId && r.studentEmail === result.studentEmail
  );
  let updated;
  if (existing !== -1) {
    updated = results.map((r, i) => i === existing ? { ...result, id: r.id } : r);
  } else {
    updated = [...results, { ...result, id: Date.now() }];
  }
  localStorage.setItem(RESULTS_KEY, JSON.stringify(updated));
  return updated;
};

export const getResultsByStudent = (email) =>
  getResults().filter(r => r.studentEmail === email);

export const getResultsByTest = (testId) =>
  getResults().filter(r => r.testId === testId);
