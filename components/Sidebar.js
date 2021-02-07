import styled from "styled-components";
import Link from "next/link";
import { Button } from "./Styles";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  background-color: rgb(0, 0, 0);
`;

const ChannelLink = styled.a`
  background-color: rgba(255, 255, 255, 0);
  transition: 0.1s;

  padding: 2px 0;
  padding-left: 20px;

  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ChannelsWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Channel = ({ channel }) => {
  return (
    <Link href={`/channels/${channel.id}`}>
      <ChannelLink>{channel.slug}</ChannelLink>
    </Link>
  );
};

export default function Sidebar({ channels, onLogOut, onAddChannel }) {
  return (
    <SidebarDiv>
      <Button onClick={onLogOut} className="cancel tilt">
        Log Out
      </Button>
      <Button onClick={onAddChannel} className="tilt">
        Add Channel
      </Button>
      <ChannelsWrapper>
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ChannelsWrapper>
    </SidebarDiv>
  );
}
