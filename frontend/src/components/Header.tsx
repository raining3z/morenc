import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';

import config from '../config';
import useForm from '../hooks/useForm';
import { FormOption } from '../types/users';

import AddForm from './AddForm';
import { Button } from './FormElements';
import Modal from './UI/Modal';

const NavContainer = styled.div<{ mobileNavIsOpen: boolean }>`
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;

  @media (max-width: 768px) {
    transform: ${({ mobileNavIsOpen }) =>
      mobileNavIsOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    height: 100vh;
  }
`;

const NavBar = styled.nav`
  max-width: ${({ theme }) => theme.widths.maxWidth};
  margin: 0 auto;
  padding: 1rem 2rem;
  justify-content: space-between;
  display: flex;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: 600;
  font-size: 1rem;
  color: #003366;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

const NavItem = styled.li`
  position: relative;
  cursor: pointer;

  &:hover ul {
    display: block;
  }
`;

const NavItemLink = styled.a`
  color: #003366;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 2.5rem;
  left: 0;
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.5rem 0;
  list-style: none;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: none;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  white-space: nowrap;

  &:hover {
    background-color: #eaeaea;
  }
`;

const HamburgerIconContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 0 15px;
  height: 50px;
  z-index: 100;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2em;
`;

const SignUp = styled(Button)``;

const { navigation } = config;

export default function Header() {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);
  // TODO: clear this when modal closes?? Both Create Account and Login showing Create Account form fields (in console.log)
  const [formOption, setFormOption] = useState<FormOption>('signup');

  const {
    addHandler,
    formData,
    handleChange,
    message,
    isModalOpen,
    setIsModalOpen,
  } = useForm(formOption);

  const HamburgerIcon = mobileNavIsOpen ? GiHamburgerMenu : FaTimes;

  const isMobile = false;

  // function toggleSubMenu(subNav: NavigationLink[]) {
  //   if (!subNav) {
  //     return null;
  //   }

  //   return {
  //     onMouseEnter: () => setIsOpen(true),
  //     onMouseLeave: () => setIsOpen(false),
  //   };
  // }

  // TODO: move this to the hook, but need to figure out other TODO above
  function showFormOption(option: FormOption) {
    setIsModalOpen(true);
    setFormOption(option);
  }

  function toggleMobileMenu() {
    setMobileNavIsOpen(!mobileNavIsOpen);
  }

  return (
    <>
      {isMobile && (
        <HamburgerIconContainer>
          <HamburgerIcon size={20} onClick={toggleMobileMenu} />
        </HamburgerIconContainer>
      )}
      <NavContainer mobileNavIsOpen={mobileNavIsOpen}>
        <NavBar>
          <NavList>
            {navigation.map((primary) => {
              const { id, label, link, subNav } = primary;

              return (
                <NavItem key={id}>
                  <NavItemLink href={link}>{label}</NavItemLink>
                  {subNav && (
                    <Dropdown>
                      {subNav.map((secondary) => {
                        const {
                          id: subId,
                          label: subLabel,
                          link: subLink,
                        } = secondary;

                        return (
                          <DropdownItem key={subId}>
                            <NavItemLink href={subLink}>{subLabel}</NavItemLink>
                          </DropdownItem>
                        );
                      })}
                    </Dropdown>
                  )}
                </NavItem>
              );
            })}
          </NavList>
          <ButtonContainer>
            <SignUp onClick={() => showFormOption('signup')}>
              Create Account
            </SignUp>
            <SignUp onClick={() => showFormOption('login')}>Login</SignUp>
          </ButtonContainer>
          <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            <AddForm
              formOption={formOption}
              addHandler={addHandler}
              formData={formData}
              handleChange={handleChange}
              buttonCopy={formOption === 'signup' ? 'Create Account' : 'Login'}
              setIsOpen={setIsModalOpen}
              message={message}
            />
          </Modal>
        </NavBar>
      </NavContainer>
    </>
  );
}
