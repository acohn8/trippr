import React from 'react';
import { Card, Icon, Image, List, Item } from 'semantic-ui-react';
import _ from 'lodash';
import YelpBusinessPage from './YelpBusinessPage';

const YelpSearchCard = (props) => {
  const result = props.result;
  return (
    <Item>
      <Item.Image
        size="small"
        src={result.image_url}
        verticalAlign="middle"
        label={{
          as: 'a',
          color: 'olive',
          icon: 'bookmark',
          ribbon: true,
        }}
      />
      <Item.Content verticalAlign="middle">
        <Item.Header>{result.name}</Item.Header>
        <Item.Meta>
          {_.times(Math.round(result.rating), () => <Icon color="yellow" name="star" />)}
        </Item.Meta>
        <Item.Description>
          {`${result.location.display_address[0]}\n${result.location.display_address[1]}`} <br />
          {result.display_phone}
        </Item.Description>
        <YelpBusinessPage id={result.id} />
        <Item.Extra>{`${Math.round(result.distance * 10) / 10} miles`}</Item.Extra>
      </Item.Content>
    </Item>
  );
};
//     <Card>
//       <YelpBusinessPage id={result.id} />
//       <Image
//         src={result.image_url}
//         size="small"
//         label={{
//           as: 'a',
//           color: 'olive',
//           icon: 'bookmark',
//           ribbon: true,
//         }}
//       />
//       <Card.Content>
//         <Card.Header>{result.name}</Card.Header>
//         <Card.Meta>
//           {_.times(Math.round(result.rating), () => <Icon color="yellow" name="star" />)}
//         </Card.Meta>
//         <List>
//           <List.Item>
//             <List.Icon name="pin" verticalAlign="middle" />
//             <List.Content>
//               <List.Header>Address</List.Header>
//               <List.Description>
//                 {`${result.location.display_address[0]}\n${result.location.display_address[1]}`}
//               </List.Description>
//             </List.Content>
//           </List.Item>
//           <List.Item>
//             <List.Icon name="phone" verticalAlign="middle" />
//             <List.Content>
//               <List.Header>Phone</List.Header>
//               <List.Description>{result.display_phone}</List.Description>
//             </List.Content>
//           </List.Item>
//         </List>
//       </Card.Content>
//       <Card.Content extra>{`${Math.round(result.distance * 10) / 10} miles`}</Card.Content>
//     </Card>
//   );
// };

export default YelpSearchCard;
