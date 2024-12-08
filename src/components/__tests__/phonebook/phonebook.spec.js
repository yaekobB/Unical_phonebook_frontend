import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Phonebook from '@/path/to/Phonebook.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import Footer from '@/components/Footer/footer.vue';
import CardView from '@/pages/phonebook/card-view.vue';
import TableView from '@/pages/phonebook/table-view.vue';
import { useUserStore } from '@/pages/user-account/store';

// Mock the store
vi.mock('@/pages/user-account/store', () => ({
  useUserStore: vi.fn(() => ({
    users: [],
    getUsers: vi.fn(),
  })),
}));

describe('Phonebook.vue', () => {
  let wrapper;
  let userStoreMock;

  beforeEach(() => {
    userStoreMock = useUserStore();
    userStoreMock.getUsers.mockResolvedValue();
    wrapper = mount(Phonebook, {
      global: {
        components: { Toolbar, Footer, CardView, TableView },
      },
    });
  });

  it('renders Toolbar and Footer components', () => {
    expect(wrapper.findComponent(Toolbar).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });

  it('renders the CardView by default', () => {
    expect(wrapper.findComponent(CardView).exists()).toBe(true);
    expect(wrapper.findComponent(TableView).exists()).toBe(false);
  });

  it('toggles between CardView and TableView', async () => {
    await wrapper.vm.toggleView('table');
    expect(wrapper.findComponent(TableView).exists()).toBe(true);
    expect(wrapper.findComponent(CardView).exists()).toBe(false);

    await wrapper.vm.toggleView('card');
    expect(wrapper.findComponent(CardView).exists()).toBe(true);
    expect(wrapper.findComponent(TableView).exists()).toBe(false);
  });

  it('calls controlPagination on search, department, or role filter changes', async () => {
    const controlPaginationSpy = vi.spyOn(wrapper.vm, 'controlPagination');
    wrapper.vm.search = 'Doe';
    await wrapper.vm.$nextTick();
    expect(controlPaginationSpy).toHaveBeenCalled();

    wrapper.vm.selectedDepartments = ['IT'];
    await wrapper.vm.$nextTick();
    expect(controlPaginationSpy).toHaveBeenCalled();

    wrapper.vm.selectedRoles = ['Student'];
    await wrapper.vm.$nextTick();
    expect(controlPaginationSpy).toHaveBeenCalled();
  });

  it('fetches users on mount', () => {
    expect(userStoreMock.getUsers).toHaveBeenCalledWith(
      wrapper.vm.pageLimit,
      wrapper.vm.currentPage,
      wrapper.vm.search,
      wrapper.vm.selectedRoles,
      wrapper.vm.selectedDepartments,
      true
    );
  });

  it('updates contacts and totalPage when controlPagination is called', async () => {
    // Mock response data
    const mockContacts = [{ name: 'John Doe', totalUsers: 16 }];
    userStoreMock.users = mockContacts;

    await wrapper.vm.controlPagination();
    expect(wrapper.vm.contacts).toEqual(mockContacts);
    expect(wrapper.vm.totalPage).toBe(2); // Assuming 8 items per page and 16 total users
  });

  it('resets pagination when searchFilter is called', async () => {
    wrapper.vm.currentPage = 2;
    wrapper.vm.pageLimit = 8;
    wrapper.vm.searchFilter();
    expect(wrapper.vm.currentPage).toBe(1);
    expect(wrapper.vm.pageLimit).toBe(8);
  });
});
