// SignUpForm.spec.js
import { mount, flushPromises } from '@vue/test-utils';
import SignUpForm from '@/components/SignUpForm.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSignUpStore } from '@/layouts/SignUp/store';
import { useUserStore } from '@/pages/user-account/store';

vi.mock('@/layouts/SignUp/store');
vi.mock('@/pages/user-account/store');

describe('SignUpForm.vue', () => {
  let wrapper;
  const mockSignUpStore = {
    formFields: [
      { key: 'email', fieldName: 'input', label: 'Email', type: 'email', cols: 12, md: 6, rules: [(v) => !!v || 'Email is required'] },
      { key: 'password', fieldName: 'password', label: 'Password', type: 'password', cols: 12, md: 6, rules: [(v) => !!v || 'Password is required'] },
      { key: 'confirmPassword', fieldName: 'password', label: 'Confirm Password', type: 'password', cols: 12, md: 6, rules: [] },
    ],
    editedItem: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    togglePasswordVisibility: vi.fn(),
    saveItem: vi.fn(),
    verifyEmail: vi.fn(),
    resendCode: vi.fn(),
    setFormFields: vi.fn(),
  };

  const mockUserStore = {
    formFields: mockSignUpStore.formFields,
  };

  beforeEach(() => {
    useSignUpStore.mockReturnValue(mockSignUpStore);
    useUserStore.mockReturnValue(mockUserStore);

    wrapper = mount(SignUpForm);
  });

  it('renders stepper and displays step 1 initially', () => {
    expect(wrapper.find('.v-stepper').exists()).toBe(true);
    expect(wrapper.vm.step).toBe(1);
  });

  it('advances to step 2 when nextStep is called on step 1', async () => {
    wrapper.vm.nextStep();
    await flushPromises();
    expect(wrapper.vm.step).toBe(2);
  });

  it('goes back to step 1 when prevStep is called on step 2', async () => {
    wrapper.setData({ step: 2 });
    wrapper.vm.prevStep();
    await flushPromises();
    expect(wrapper.vm.step).toBe(1);
  });

  it('validates email verification code on submit', async () => {
    wrapper.setData({ verificationCode: '123456' });
    await wrapper.vm.verifyEmail();
    expect(mockSignUpStore.verifyEmail).toHaveBeenCalledWith('123456');
  });

  it('triggers resendCode method when resend button is clicked', async () => {
    await wrapper.find('button:contains("Resend Verification Code")').trigger('click');
    expect(mockSignUpStore.resendCode).toHaveBeenCalled();
  });

  it('disables next button if form is invalid', async () => {
    wrapper.setData({ isValidAdd: false });
    await flushPromises();
    const nextButton = wrapper.find('button:contains("Register")');
    expect(nextButton.attributes('disabled')).toBeDefined();
  });

  it('checks password confirmation rule', async () => {
    wrapper.setData({
      signUpStore: {
        editedItem: { password: 'test123', confirmPassword: 'test124' },
      },
    });
    const confirmPasswordField = wrapper.find('input[type="password"]');
    await confirmPasswordField.setValue('test124');
    const passwordMatchRule = wrapper.vm.getFieldRules('confirmPassword', []);
    expect(passwordMatchRule[1]('test124')).toBe("Passwords do not match");
  });

  it('toggles password visibility', async () => {
    wrapper.vm.togglePasswordVisibility('password');
    expect(mockSignUpStore.togglePasswordVisibility).toHaveBeenCalledWith('password');
  });
});
