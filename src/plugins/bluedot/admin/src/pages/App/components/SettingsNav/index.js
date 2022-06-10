import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
} from '@strapi/design-system/v2/SubNav';

const SettingsNav = () => {
  return (
    <SubNav ariaLabel="Bluedot">
      <SubNavHeader label="Bluedot" />
      <SubNavSections>
        <SubNavSection label="General">
          <SubNavLink as={NavLink} to="/plugins/bluedot/plugin-infos" key="home">
            Overview
          </SubNavLink>
          <SubNavLink as={NavLink} to="/plugins/bluedot/posts" key="post">
            Post
          </SubNavLink>
          <SubNavLink as={NavLink} to="/plugins/bluedot/members" key="member">
            Member
          </SubNavLink>
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};

export default SettingsNav;
