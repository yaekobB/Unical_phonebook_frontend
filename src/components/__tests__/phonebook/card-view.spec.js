import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ContactDetailsCard from '@/pages/phonebook/card-view.vue';

describe('ContactDetailsCard.vue', () => {
  let wrapper;

  const mockContacts = [
    {
      userId: 1,
      firstName: 'John',
      middleName: 'A',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+123456789',
      department: 'Engineering',
      userType: 'Faculty',
      address: '123 Main St, Office 101',
      websiteLink: 'https://example.com',
      linkedIn: 'https://linkedin.com/in/johndoe'
    },
    {
      userId: 2,
      firstName: 'Jane',
      middleName: 'B',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+987654321',
      department: 'Science',
      userType: 'Student',
      address: '456 Side St, Office 202',
    },
  ];

  beforeEach(() => {
    wrapper = mount(ContactDetailsCard, {
      props: {
        contacts: mockContacts,
      },
    });
  });

  it('renders the correct number of contact cards', () => {
    const contactCards = wrapper.findAllComponents({ name: 'v-card' });
    expect(contactCards).toHaveLength(mockContacts.length);
  });

  it('displays the full name of each contact', () => {
    mockContacts.forEach((contact, index) => {
      const fullName = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
      const cardTitle = wrapper.findAll('.v-card-title').at(index);
      expect(cardTitle.text()).toContain(fullName);
    });
  });

  it('displays the department and role of each contact', () => {
    mockContacts.forEach((contact, index) => {
      const card = wrapper.findAll('.scrollable-card').at(index);
      expect(card.text()).toContain(contact.department);
      expect(card.text()).toContain(contact.userType);
    });
  });

  it('displays the office address of each contact', () => {
    mockContacts.forEach((contact, index) => {
      const card = wrapper.findAll('.scrollable-card').at(index);
      expect(card.text()).toContain(contact.address);
    });
  });

  it('displays social media buttons based on available contact information', () => {
    const firstCardIcons = wrapper.findAllComponents({ name: 'v-icon' }).wrappers;

    expect(firstCardIcons.some(icon => icon.props('icon') === 'mdi-email')).toBe(true);
    expect(firstCardIcons.some(icon => icon.props('icon') === 'mdi-phone')).toBe(true);
    expect(firstCardIcons.some(icon => icon.props('icon') === 'mdi-web')).toBe(true);
    expect(firstCardIcons.some(icon => icon.props('icon') === 'mdi-linkedin')).toBe(true);

    const secondCardIcons = wrapper.findAllComponents({ name: 'v-icon' }).wrappers;

    expect(secondCardIcons.some(icon => icon.props('icon') === 'mdi-email')).toBe(true);
    expect(secondCardIcons.some(icon => icon.props('icon') === 'mdi-phone')).toBe(true);
    expect(secondCardIcons.some(icon => icon.props('icon') === 'mdi-web')).toBe(false);
    expect(secondCardIcons.some(icon => icon.props('icon') === 'mdi-linkedin')).toBe(false);
  });

  it('renders links to social media profiles correctly', () => {
    const websiteButton = wrapper.findAll('a[href="https://example.com"]');
    const linkedInButton = wrapper.findAll('a[href="https://linkedin.com/in/johndoe"]');

    expect(websiteButton).toHaveLength(1);
    expect(linkedInButton).toHaveLength(1);
  });
});
