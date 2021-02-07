import styled from 'styled-components';
import Link from 'next/link';

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  background-color: rgb(0, 0, 0);
`;

const Channel = ({ channel }) => {
  return (
    <Link href={`/channels/${channel.id}`}>
      <a>{channel.slug}</a>
    </Link>
  );
};

export default function Sidebar({ channels }) {
  return (
    <SidebarDiv>
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </SidebarDiv>
  );
}
