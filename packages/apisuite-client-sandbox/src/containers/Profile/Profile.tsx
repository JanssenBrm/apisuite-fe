import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import Select from 'components/Select'
import { SelectOption } from 'components/Select/types'
import { isValidImage, isValidPhoneNumber, isValidURL } from 'components/FormField/index'

import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'

import Close from '@material-ui/icons/Close'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'

import { Organization, ProfileProps } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

import { useForm } from 'util/useForm'

const Profile: React.FC<ProfileProps> = ({
  getProfile,
  logout,
  profile,
  updateProfile,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'profile')
    of all user-related information we presently have. */
    getProfile()
  }, [getProfile])

  /*
  User details

  Note:
  - 'formState' refers to our own, local copy of a user's details.
  - 'profile' refers to our stored, back-end approved copy of a user's details.
  */

  const {
    formState,
    handleChange,
    handleFocus,
    resetForm,
  } = useForm(
    // Initial user details
    {
      userAvatarURL: '',
      userBio: '',
      userEmailAddress: '',
      userName: '',
      userPhoneNumber: '',
    },
    // Rules for the user details
    {
      userAvatarURL: {
        rules: [
          // TODO: Look into why TypeScript complains about this
          async (URI) => {
            const stringURI = URI.toString()

            if (stringURI.length === 0) {
              /* Empty URI? That's okay - it just means we don't want,
              or have an image to display on the user's Avatar. */
              return true
            } else {
              /* Non-empty URI? Cool! First, we determine if that URI is valid,
              and then we need to check if the URI points to an actual image.
              If any of these conditions are not met, we display an error message. */
              const doesImageExist = isValidURL(URI) && await (isValidImage(URI))

              return doesImageExist
            }
          },
        ],
        message: t('profileTab.warningLabels.userAvatarURL', { config }),
      },

      userPhoneNumber: {
        rules: [
          (phoneNumber) => {
            const stringPhoneNumber = phoneNumber.toString()

            if (stringPhoneNumber.length === 0) {
              return true
            } else {
              return isValidPhoneNumber(phoneNumber)
            }
          },
        ],
        message: t('profileTab.warningLabels.userPhoneNumber', { config }),
      },
    })

  let userNameInitials = ''

  if (profile) {
    const userNameInitialsArray = profile.user.name.split(' ')

    userNameInitials = userNameInitialsArray[0].charAt(0).toLocaleUpperCase()
  }

  const [avatarHasBeenClicked, setAvatarHasBeenClicked] = React.useState(false)

  React.useEffect(() => {
    resetForm(
      {
        userAvatarURL: profile.user.avatar ? profile.user.avatar : '',
        userBio: '',
        userEmailAddress: profile.user.email,
        userName: profile.user.name,
        userPhoneNumber: (profile.user.mobile && profile.user.mobile !== '0')
          ? profile.user.mobile
          : '',
      },
    )
  }, [profile])

  /* Organisation details */

  const [currentlySelectedOrganisation, setCurrentlySelectedOrganisation] = React.useState({
    group: '',
    label: '',
    value: '',
  })

  const organisationSelector = (organisations: Organization[]) => {
    return organisations.map((organisation) => ({
      group: '',
      label: organisation.name,
      value: organisation.id,
    }))
  }

  const handleOrganisationSelection = (event: React.ChangeEvent<{}>, selectedOrganisation: SelectOption) => {
    event.preventDefault()

    const newlySelectedOrganisation = {
      group: '',
      label: selectedOrganisation.label,
      value: selectedOrganisation.value,
    }

    setCurrentlySelectedOrganisation(newlySelectedOrganisation)
  }

  React.useEffect(() => {
    // Once our store's 'profile' details load, we store them locally
    setCurrentlySelectedOrganisation({
      group: '',
      label: profile.current_org.name,
      value: profile.current_org.id,
    })
  }, [profile])

  /* All details (i.e., user & organisation details) */

  const updateProfileDetails = (event: React.ChangeEvent<{}>, selectedOrganisation?: SelectOption) => {
    event.preventDefault()

    if (selectedOrganisation && selectedOrganisation.value) {
      const userAvatarURL = profile.user.avatar ? profile.user.avatar : ''
      const userBio = ''
      const userName = profile.user.name
      const userOrganisation = selectedOrganisation.value.toString()
      const userPhoneNumber = profile.user.mobile ? profile.user.mobile : '0'

      updateProfile(userName, userBio, userAvatarURL, userPhoneNumber, userOrganisation)
    } else {
      const userAvatarURL = formState.values.userAvatarURL
      const userBio = formState.values.userBio
      const userName = formState.values.userName
      const userOrganisation = profile.current_org.id.toString()
      const userPhoneNumber = formState.values.userPhoneNumber
        ? formState.values.userPhoneNumber
        : '0'

      updateProfile(userName, userBio, userAvatarURL, userPhoneNumber, userOrganisation)
    }
  }

  const shouldUpdateProfileDetails = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    if (
      currentlySelectedOrganisation &&
      currentlySelectedOrganisation.value &&
      currentlySelectedOrganisation.value !== profile.current_org.id
    ) {
      updateProfileDetails(event, currentlySelectedOrganisation)
    }
  }

  return (
    <main className='page-container'>
      <section className={classes.allUserDetailsContainer}>
        <div className={classes.leftSideDetailsContainer}>
          <div className={classes.userNameAndRoleContainer}>
            <p className={classes.userName}>{profile.user.name}</p>

            <p className={classes.userRole}>
              {
                profile.current_org.role.name === 'admin'
                  ? t('profileTab.roleRelatedLabels.admin', { config })
                  : (profile.current_org.role.name === 'organizationOwner')
                    ? t('profileTab.roleRelatedLabels.orgOwner', { config })
                    : t('profileTab.roleRelatedLabels.developer', { config })
              }
            </p>
          </div>

          <p className={classes.subtitle}>
            {t('profileTab.subtitle', { config })}
          </p>

          <div>
            <p
              className={
                profile.orgs_member.length !== 0
                  ? classes.regularOrganisationDetailsTitle
                  : classes.alternativeOrganisationDetailsTitle
              }
            >
              <>{t('profileTab.orgRelatedLabels.selectorTitle', { config })}</>
            </p>

            {
              profile.orgs_member.length !== 0
                ? (
                  <>
                    <Select
                      className={classes.organisationSelector}
                      customCloseIcon={<ExpandLessRoundedIcon />}
                      customOpenIcon={<ExpandMoreRoundedIcon />}
                      fieldLabel={t('profileTab.orgRelatedLabels.selectorLabel', { config })}
                      onChange={handleOrganisationSelection}
                      options={organisationSelector(profile.orgs_member)}
                      selected={
                        organisationSelector(profile.orgs_member).find((selectedOrganisation) => {
                          return selectedOrganisation.value === profile.current_org.id
                        })
                      }
                    />

                    {console.log(currentlySelectedOrganisation, profile.current_org)}

                    <Button
                      customButtonClassName={
                        currentlySelectedOrganisation.value !== profile.current_org.id
                          ? classes.enabledOrganisationButton
                          : classes.disabledOrganisationButton
                      }
                      href='profile/organisation'
                      label='Switch'
                      onClick={shouldUpdateProfileDetails}
                    />
                  </>
                )
                : (
                  <Button
                    customButtonClassName={classes.enabledOrganisationButton}
                    href='profile/organisation'
                    label={t('profileTab.orgRelatedLabels.createOrgButtonLabel', { config })}
                  />
                )
            }
          </div>

          <hr
            className={
              profile.orgs_member.length !== 0
                ? classes.regularSectionSeparator
                : classes.alternativeSectionSeparator
            }
          />

          <div className={classes.otherActionsContainer}>
            <Button
              customButtonClassName={classes.otherActionsButtons}
              href='#'
              label={t('profileTab.otherActionsLabels.changePassword', { config })}
            />

            <Button
              customButtonClassName={classes.otherActionsButtons}
              href='profile/team'
              label={t('profileTab.otherActionsLabels.viewTeam', { config })}
            />
          </div>
        </div>

        <div className={classes.rightSideDetailsContainer}>
          {/* 'Form' div */}
          <div className={classes.formFieldsContainer}>
            <div>
              {
                avatarHasBeenClicked
                  ? (
                    <Close
                      className={classes.avatarIcons}
                      onClick={() => setAvatarHasBeenClicked(!avatarHasBeenClicked)}
                    />
                  )
                  : (
                    <ImageSearchRoundedIcon
                      className={classes.avatarIcons}
                      onClick={() => setAvatarHasBeenClicked(!avatarHasBeenClicked)}
                    />
                  )
              }

              <Avatar
                className={classes.avatar}
                src={formState.values.userAvatarURL}
                onClick={() => setAvatarHasBeenClicked(!avatarHasBeenClicked)}
              >
                {userNameInitials}
              </Avatar>

              {
                avatarHasBeenClicked
                  ? (
                    <TextField
                      className={classes.inputFields}
                      error={formState.touched.userAvatarURL && formState.errors.userAvatarURL}
                      fullWidth
                      helperText={
                        formState.touched.userAvatarURL &&
                        formState.errors.userAvatarURL &&
                        formState.errorMsgs.userAvatarURL
                      }
                      label={t('profileTab.userRelatedLabels.userAvatarURL', { config })}
                      margin='dense'
                      name='userAvatarURL'
                      onChange={handleChange}
                      onFocus={handleFocus}
                      type='url'
                      value={formState.values.userAvatarURL}
                      variant='outlined'
                    />
                  )
                  : null
              }
            </div>

            <hr className={classes.formSectionSeparator} />

            <TextField
              className={classes.inputFields}
              fullWidth
              label={t('profileTab.userRelatedLabels.userName', { config })}
              margin='dense'
              name='userName'
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              value={formState.values.userName}
              variant='outlined'
            />

            <TextField
              className={classes.inputFields}
              fullWidth
              label={t('profileTab.userRelatedLabels.userEmailAddress', { config })}
              margin='dense'
              name='userEmailAddress'
              onChange={handleChange}
              onFocus={handleFocus}
              type='email'
              value={formState.values.userEmailAddress}
              variant='outlined'
            />

            <TextField
              className={classes.inputFields}
              error={formState.touched.userPhoneNumber && formState.errors.userPhoneNumber}
              fullWidth
              helperText={
                formState.touched.userPhoneNumber &&
                formState.errors.userPhoneNumber &&
                formState.errorMsgs.userPhoneNumber
              }
              label={t('profileTab.userRelatedLabels.userPhoneNumber', { config })}
              margin='dense'
              name='userPhoneNumber'
              onChange={handleChange}
              onFocus={handleFocus}
              type='tel'
              value={formState.values.userPhoneNumber}
              variant='outlined'
            />

            <Button
              customButtonClassName={
                formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0)
                  ? classes.enabledUpdateDetailsButton
                  : classes.disabledUpdateDetailsButton
              }
              label={t('profileTab.otherActionsLabels.updateProfileDetails', { config })}
              onClick={updateProfileDetails}
            />

            <div className={classes.userStatusAndType}>
              {/* A mere dot */}
              <span>&#9679;</span>

              <p>
                {
                  profile.current_org.role.name === 'admin'
                    ? t('profileTab.roleRelatedLabels.admin', { config })
                    : (profile.current_org.role.name === 'organizationOwner')
                      ? t('profileTab.roleRelatedLabels.orgOwner', { config })
                      : t('profileTab.roleRelatedLabels.developer', { config })
                }
              </p>
            </div>
          </div>

          {/* 'Logout' and 'Delete' buttons div */}
          <div className={classes.otherActionsContainer}>
            <Button
              customButtonClassName={classes.otherActionsButtons}
              href='#'
              label={t('profileTab.otherActionsLabels.logOut', { config })}
              onClick={logout}
            />

            <Button
              customButtonClassName={classes.deleteProfileButton}
              href='#'
              label={t('profileTab.otherActionsLabels.deleteProfile', { config })}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile
