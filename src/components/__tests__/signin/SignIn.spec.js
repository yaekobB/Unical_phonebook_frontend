import { render, fireEvent, screen } from '@testing-library/vue';
import SignIn from '@/layouts/SignIn/SignIn.vue';  // Adjust path as needed

describe('SignIn Component', () => {
  it('renders the sign-in form', async () => {
    render(SignIn);

    // Check if the Email field is present
    expect(screen.getByLabelText('Email')).toBeInTheDocument();

    // Check if the Password field is present
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Check if the Sign In button is disabled initially
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeDisabled();
  });

  it('validates email input correctly', async () => {
    render(SignIn);

    // Enter invalid email
    const emailField = screen.getByLabelText('Email');
    await fireEvent.update(emailField, 'invalid-email');
    
    // The email validation error should show
    expect(screen.getByText('Invalid Organizational Email')).toBeInTheDocument();
  });

  it('enables the sign-in button when inputs are valid', async () => {
    render(SignIn);

    const emailField = screen.getByLabelText('Email');
    const passwordField = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    // Simulate valid email and password
    await fireEvent.update(emailField, 'user@unical.it');
    await fireEvent.update(passwordField, 'validpassword');

    // The button should now be enabled
    expect(signInButton).not.toBeDisabled();
  });

  it('toggles the password visibility', async () => {
    render(SignIn);

    const passwordField = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: /mdi-eye/i });

    // Initially, the password field type should be 'password'
    expect(passwordField).toHaveAttribute('type', 'password');

    // Click the toggle to show the password
    await fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute('type', 'text');
  });

  it('calls the signIn method when form is valid', async () => {
    const mockSignIn = jest.fn();
    // Mock the store method
    // jest.mock('@/layouts/SignIn/store.js', () => ({
    //   useSignInStore: () => ({
    //     signIn: mockSignIn,
    //   }),
    // }));

    render(SignIn);

    const emailField = screen.getByLabelText('Email');
    const passwordField = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    // Simulate valid email and password
    await fireEvent.update(emailField, 'user@unical.it');
    await fireEvent.update(passwordField, 'validpassword');

    // Click on the Sign In button
    await fireEvent.click(signInButton);

    // Check if the signIn function was called
    expect(mockSignIn).toHaveBeenCalled();
  });
});
