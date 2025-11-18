const USERS = {
  'Dolly':       'tylerluvdolly112',
  'Dianne':      'tylerluvdianne112',
  'Zera':        'tylerluvzera112',
  'Ingridromer': 'tylerluvingrid112',
  'Deborah11':     'tylerluvdeborah112',
  'Antoinette':  'tylerluvantoinette112',
  'Anna':        'tylerluvanna112'
};

const $ = id => document.getElementById(id);
const show = id => {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = $(id);
  if (target) target.classList.add('active');
};

const showLoading = (duration, callback) => {
  const loading = $('loading');
  if (loading) loading.classList.add('active');
  setTimeout(() => {
    if (loading) loading.classList.remove('active');
    callback();
  }, duration);
};

let pwdVisible = false;
const togglePwd = $('toggle-pwd');
if (togglePwd) togglePwd.addEventListener('click', () => {
  pwdVisible = !pwdVisible;
  const input = $('login-password');
  if (input) input.type = pwdVisible ? 'text' : 'password';
  togglePwd.classList.toggle('off', !pwdVisible);
});

const btnLogin = $('btn-login');
if (btnLogin) btnLogin.addEventListener('click', () => {
  const username = $('login-username')?.value.trim() ?? '';
  const password = $('login-password')?.value ?? '';
  const msg = $('login-msg');
  if (msg) msg.textContent = '';

  if (USERS[username] && USERS[username] === password) {
    showLoading(5000, () => {
      $('user-name')?.replaceChildren(username);
      $('welcome-name')?.replaceChildren(username);

      const checkingBalance = $('checking-balance');
      const savingsBalance = $('savings-balance');
      const bankingTotal = $('banking-total');
      const checkingTbody = $('checking-tbody');
      const savingsTbody = $('savings-tbody');
      let baseChecking = 40120;
      let baseSavings = 50030;
      let baseTotal = 90150;
      let extraChecking = 0;
      let extraSavings = 0;
      let newCheckingRowHTML = '';
      let newSavingsRowHTML = '';

      if (username === 'Dolly') {
        extraChecking = 500;
        newCheckingRowHTML = '<tr><td>October 29, 2025</td><td>Zelle</td><td>$500.00</td></tr>';
        extraSavings = 1000;
        newSavingsRowHTML = '<tr><td>October 31, 2025</td><td>Deposit</td><td>$1,000.00</td></tr>';
      } else if (username === 'Deborah') {
        extraChecking = 483;
        newCheckingRowHTML = '<tr><td>October 29, 2025</td><td>Cashapp</td><td>$483.00</td></tr>';
        extraSavings = 835;
        newSavingsRowHTML = '<tr><td>October 31, 2025</td><td>Deposit</td><td>$835.00</td></tr>';
      } else if (username === 'Jenny') {
        baseChecking = 30130;
        baseSavings = 20010;
        baseTotal = 50140;
      }

      // Set initial transaction amounts to base
      $('checking-transaction-amount').textContent = '$' + baseChecking.toLocaleString() + '.00';
      $('savings-transaction-amount').textContent = '$' + baseSavings.toLocaleString() + '.00';

      // Add extra rows if any
      if (extraChecking !== 0) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = newCheckingRowHTML;
        checkingTbody.insertBefore(newRow, checkingTbody.firstChild);
      }
      if (extraSavings !== 0) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = newSavingsRowHTML;
        savingsTbody.insertBefore(newRow, savingsTbody.firstChild);
      }

      // Set dashboard balances
      checkingBalance.textContent = '$' + (baseChecking + extraChecking).toLocaleString() + '.00';
      savingsBalance.textContent = '$' + (baseSavings + extraSavings).toLocaleString() + '.00';
      bankingTotal.textContent = '$' + (baseTotal + extraChecking + extraSavings).toLocaleString() + '.00';

      show('dashboard');
    });
  } else {
    if (msg) msg.textContent = 'Incorrect User ID or Password';
  }
});

const btnLogout = $('btn-logout');
if (btnLogout) btnLogout.addEventListener('click', () => {
  showLoading(3000, () => {
    show('login');
    $('login-username').value = '';
    $('login-password').value = '';
  });
});

// === NAVIGATION (unchanged) ===
$('menu-tap')?.addEventListener('click', () => showLoading(3000, () => show('menu-screen')));
$('back-menu')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('inbox-tap')?.addEventListener('click', () => showLoading(3000, () => show('inbox')));
$('back-inbox')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));

$('nav-transfer')?.addEventListener('click', () => showLoading(3000, () => show('transfer')));
$('nav-bill')?.addEventListener('click', () => showLoading(3000, () => show('bills')));
$('nav-deposit')?.addEventListener('click', () => showLoading(3000, () => show('deposit')));
$('nav-invest')?.addEventListener('click', () => showLoading(3000, () => show('invest')));

$('back-zelle')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-transfer')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-deposit')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-bills')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-invest')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));

$('checking-card')?.addEventListener('click', () => showLoading(3000, () => show('checking-transactions')));
$('savings-card')?.addEventListener('click', () => showLoading(3000, () => show('savings-transactions')));
$('view-checking')?.addEventListener('click', () => showLoading(3000, () => show('checking-transactions')));
$('view-savings')?.addEventListener('click', () => showLoading(3000, () => show('savings-transactions')));

$('view-customized')?.addEventListener('click', () => showLoading(3000, () => show('customized-cash-transactions')));
$('view-unlimited')?.addEventListener('click', () => showLoading(3000, () => show('unlimited-cash-transactions')));

$('back-checking')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-savings')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-customized')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
$('back-unlimited')?.addEventListener('click', () => showLoading(3000, () => show('dashboard')));
