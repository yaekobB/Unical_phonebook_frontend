import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DataTableComponent from '@/pages/phonebook/table-view.vue';

describe('DataTableComponent.vue', () => {
  let wrapper;

  const mockContacts = [
    {
      firstName: 'John',
      middleName: 'A',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+123456789',
      department: 'Engineering',
      userType: 'Faculty',
    },
    {
      firstName: 'Jane',
      middleName: 'B',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+987654321',
      department: 'Science',
      userType: 'Student',
    },
  ];

  beforeEach(() => {
    wrapper = mount(DataTableComponent, {
      props: {
        contacts: mockContacts,
      },
    });
  });

  it('renders table with correct columns', () => {
    const columns = wrapper.findAll('th');
    expect(columns).toHaveLength(6);
    expect(columns[0].text()).toBe('Full Name');
    expect(columns[1].text()).toBe('Email');
    expect(columns[2].text()).toBe('Phone Number');
    expect(columns[3].text()).toBe('Department');
    expect(columns[4].text()).toBe('Role');
  });

  it('maps contacts to include full name in computed property', () => {
    const mappedContacts = wrapper.vm.getContacts;
    expect(mappedContacts).toHaveLength(2);
    expect(mappedContacts[0].fullName).toBe('John A Doe');
    expect(mappedContacts[1].fullName).toBe('Jane B Smith');
  });

  it('renders the expanded row with tabs correctly', async () => {
    // Expanding the first row
    const expandIcon = wrapper.findAll('.v-data-table__expand-icon')[0];
    await expandIcon.trigger('click');
    
    // Check if the row expanded and the tabs are rendered
    expect(wrapper.findComponent({ name: 'v-tabs' }).exists()).toBe(true);
    const tabs = wrapper.findAll('.v-tab');
    expect(tabs).toHaveLength(4);
    expect(tabs[0].text()).toContain('Personal Information');
    expect(tabs[1].text()).toContain('Office');
    expect(tabs[2].text()).toContain('Social Medias');
    expect(tabs[3].text()).toContain('Working Hours');
  });

  it('switches between tabs in the expanded row', async () => {
    const expandIcon = wrapper.findAll('.v-data-table__expand-icon')[0];
    await expandIcon.trigger('click');
    
    // Simulate clicking on the "Office" tab
    const officeTab = wrapper.findAll('.v-tab')[1];
    await officeTab.trigger('click');
    
    expect(wrapper.vm.tab).toBe('tab-2');
    const activeTabContent = wrapper.find('.v-tabs-window-item');
    expect(activeTabContent.exists()).toBe(true);
  });
});
