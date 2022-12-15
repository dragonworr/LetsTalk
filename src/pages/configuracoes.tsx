import { Configurations } from 'components/ConfigurationsPage';
import { Loading } from 'components/ConfigurationsPage/Loading';
import { Wrapper } from 'components/Sidebar/Wrapper';
import { GetServerSideProps } from 'next';
import { redirectToUserIfNoUser } from 'utils/redirectToHomeIfNoUser';

export default function ConfigurationsPage() {
  return (
    <>
      <Wrapper>
        <Configurations />
      </Wrapper>
      <Loading />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToUserIfNoUser;
