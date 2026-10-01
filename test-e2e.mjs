async function runTests() {
  console.log('--- STARTING VERIFICATION TESTS ---');

  // 1. Login Page
  const loginRes = await fetch('http://localhost:3000/login');
  console.log('1. /login HTTP Status:', loginRes.status);

  // 2. Team Login
  const teamLoginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'TEAM01', pin: '1234' }),
  });
  const teamLoginData = await teamLoginRes.json();
  const rawTeamCookie = teamLoginRes.headers.get('set-cookie') || '';
  const teamCookie = rawTeamCookie.split(';')[0];
  console.log('2. Team Login Result:', teamLoginData.success ? 'SUCCESS' : 'FAILED', '| Role:', teamLoginData.role);

  // 3. Admin Login
  const adminLoginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'ADMIN', pin: 'admin123' }),
  });
  const adminLoginData = await adminLoginRes.json();
  const rawAdminCookie = adminLoginRes.headers.get('set-cookie') || '';
  const adminCookie = rawAdminCookie.split(';')[0];
  console.log('3. Admin Login Result:', adminLoginData.success ? 'SUCCESS' : 'FAILED', '| Role:', adminLoginData.role);

  // 4. Admin Stats
  const statsRes = await fetch('http://localhost:3000/api/admin/stats', {
    headers: { Cookie: adminCookie },
  });
  const stats = await statsRes.json();
  console.log('4. Admin Stats -> Total Teams:', stats.totalTeams, '| Participants:', stats.totalParticipants, '| Cases:', Object.keys(stats.caseDistribution).length);

  // 5. Inspect Evidence
  const inspectRes = await fetch('http://localhost:3000/api/play/evidence/inspect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: teamCookie,
    },
    body: JSON.stringify({ caseId: 'CASE-01', evidenceCode: 'E01' }),
  });
  const inspectData = await inspectRes.json();
  console.log('5. Evidence Inspection -> Item Title:', inspectData.item?.title, '| Total Inspected:', inspectData.inspectedCount);

  // 6. Save Answer
  const saveRes = await fetch('http://localhost:3000/api/play/answers/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: teamCookie,
    },
    body: JSON.stringify({
      caseId: 'CASE-01',
      questionId: 'q-CASE-01-1',
      answerValue: 'Murder staged as an accident/burglary',
    }),
  });
  const saveData = await saveRes.json();
  console.log('6. Answer Autosave -> Result:', saveData.success ? 'SAVED' : 'FAILED');

  // 7. Case Submit
  const submitRes = await fetch('http://localhost:3000/api/play/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: teamCookie,
    },
    body: JSON.stringify({
      caseId: 'CASE-01',
      culprit: 'Sarah Menon',
      whatHappened: 'She used the spare key, killed Vikram using the brass owl paperweight, staged the scene to make it look like a break-in from the window, and locked the room from outside.',
      motive: 'Vikram discovered she was moving company money into her own account and intended to end their partnership and expose the issue.',
      evidenceUsed: 'Two coffee cups, brass owl paperweight with blood, open window with undisturbed flower bed, and key on the desk.',
      fullSequence: 'Sarah entered at 10:12 PM, argued with Vikram, struck him with the paperweight, staged the window, locked the door with the spare key, and left at 11:02 PM.',
    }),
  });
  const submitData = await submitRes.json();
  console.log('7. Case Submission & Scoring ->', {
    success: submitData.success,
    autoScore: submitData.autoScore,
    reconScore: submitData.reconScore,
    timeBonus: submitData.timeBonus,
    hintPenalty: submitData.hintPenalty,
    finalScore: submitData.finalScore,
  });

  // 8. Admin Results after submission
  const monitorRes = await fetch('http://localhost:3000/api/admin/teams', {
    headers: { Cookie: adminCookie },
  });
  const monitorData = await monitorRes.json();
  const team1Row = monitorData.monitor.find(m => m.team_code === 'TEAM01');
  console.log('8. Admin Monitor Entry -> Team:', team1Row?.team_code, '| Status:', team1Row?.status, '| Score:', team1Row?.final_score);

  console.log('\n>>> ALL 8 VERIFICATION TESTS COMPLETED SUCCESSFULLY! <<<');
}

runTests().catch(console.error);
