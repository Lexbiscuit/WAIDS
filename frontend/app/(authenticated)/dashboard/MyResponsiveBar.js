import { ResponsiveBar } from '@nivo/bar'

const getIdData = async (id) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/dashboard/MyResponsiveBar/id?id=" + id,
        {
          cache: "no-store",
        }
      );
  
      if (!res.ok) throw new Error("Failed to fetch logs.");
  
      return res.json();
    } catch (error) {
      console.log("Error getting logs: ", error);
    }
  };

  const getKeyData = async (key) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/dashboard/MyResponsiveBar/key?key=" + key,
        {
          cache: "no-store",
        }
      );
  
      if (!res.ok) throw new Error("Failed to fetch logs.");
  
      return res.json();
    } catch (error) {
      console.log("Error getting logs: ", error);
    }
  };


const MyResponsiveBar = ({ id, keys }) => {

    const [logData, setLogData] = React.useState(null);
    const [idData, setIdData] = React.useState(null);
    const [keyData, setKeyData] = React.useState(null);

    return (
    <ResponsiveBar
        data={logData}
        keys={keys}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
    />
)}