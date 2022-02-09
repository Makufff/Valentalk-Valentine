import {Wrap , Badge , Box , Button , HStack , Heading , Text , Divider , Container , FormControl , Select, Center } from '@chakra-ui/react';
import QuestionCard from './components/QuestionCard';
import {useEffect , useState} from 'react';
import './App.css';

const App = () => {
  const [data , setData] = useState([]);
  const [rawdata , setRawdata] = useState([]);
  const [ischange , setChange] = useState(false);

  useEffect(() => {
    getTable();
    console.log('a');
  } , [])

  const labels = {
    "ม.1" : "มัธยมศึกษาปีที่ 1",
    "ม.2" : "มัธยมศึกษาปีที่ 2",
    "ม.3" : "มัธยมศึกษาปีที่ 3",
    "ม.4" : "มัธยมศึกษาปีที่ 4",
    "ม.5" : "มัธยมศึกษาปีที่ 5",
    " ม.6" : "มัธยมศึกษาปีที่ 6",
    "ม.6" : "มัธยมศึกษาปีที่ 6",
  };
  
  const CreateUrl = (key, gql) => {
    let gq = 'SELECT '+ gql;
    let encodedgg = encodeURIComponent(gq);
    let url = 'https://docs.google.com/spreadsheets/d/' + key + '/gviz/tq?tq=' + encodedgg;
    return url;
  };
  
  const preview = (url) => {
    fetch(url).then(data => data.text()).then(function(response) {
      var responseText = response.substring(response.indexOf("(") + 1, response.lastIndexOf(")"));
      var response = JSON.parse(responseText);
      
      response = response['table']['rows'];
      let fdata = [];
      console.log(response);
      for(let i=0 ; i<response.length ; i++){
        if(response[i]['c'][1]['v']==='-'){
          response[i]['c'][1]['v'] = 'นิรนาม';
        }

        if(response[i]['c'][4]['v']===null){
          response[i]['c'][4]['v'] = 'ยังไม่มีคำตอบ';
        }

        //let s = "";
        // for(let j=0 ; j<response[i]['c'][3]['v'].length ; j++){
        //   if(response[i]['c'][3]['v'][j]===','){
        //     s += '","'
        //     j++;
        //   }else{
        //     s += response[i]['c'][3]['v'][j];
        //   }
        // }

        //s = JSON.parse('["' + s + '"]');
        fdata.push({
          "date" : response[i]['c'][0]['f'],
          "author" : response[i]['c'][7]['v'],
          "question" : response[i]['c'][4]['v'],
          "tags" : labels[response[i]['c'][2]['v']] ? labels[response[i]['c'][2]['v']] : response[i]['c'][2]['v'],
          "answer" : response[i]['c'][5]['v']
        });
      }

      if(fdata.length!==data.length && !ischange){
        setData(fdata);
        setChange(true);
        setRawdata(fdata);
        console.log(fdata);
      }
    });
  };
  
  
  const getTable = () => {
    // let gsKey = '1Ga5LqToH5gC10Phmp2N_Q5qnapWHVL3JYmcJYT4v4Kc';
    let gsKey = '19jbOGHGcz4YOSZ22vk_vNgU_oIlxeuSGC97dhULb41U';
    let gql = `*`;
    let url = CreateUrl(gsKey, gql);
    preview(url);
  };

  const getValue = (e) => {
    e.preventDefault();
    if(!e.target.a.value){
      setData(rawdata);
    }else{
      //console.log(e.target.a.value);
      let fdata = [];
      for(let i=0 ; i<rawdata.length ; i++){
        // let found = false;
        // for(let j=0 ; j<rawdata[i]['tags'].length ; j++){
        //   if(e.target.a.value===rawdata[i]['tags'][j] || e.target.a.value==='')found=true;
        // }
        if(e.target.a.value===rawdata[i]['tags']) fdata.push(rawdata[i]);
      }
      setData(fdata);
    }
  };

  return (
    <div className="App">
      <Container className="container-box" maxW='container.lg'>
        <Heading>Valentalk Valentine‘s</Heading>
        <Text mt={3}>มา : <Badge colorScheme="pink"><a target='_blank' href="https://docs.google.com/forms/d/e/1FAIpQLSeW1kPh2OVFEFIgjTDd0u2OHk4M0sW8bobf4EbF1V5qusQgyA/viewform" color='purple'>เล่าประสบการณ์กัน !!!</a></Badge></Text>
        <form onSubmit={getValue}>
          <HStack spacing='24px' mt={5}>
          <Select placeholder='ทั้งหมด' className="select-box" name="a">
            <option value="มัธยมศึกษาปีที่ 1">ม.1</option>
            <option value="มัธยมศึกษาปีที่ 2">ม.2</option>
            <option value="มัธยมศึกษาปีที่ 3">ม.3</option>
            <option value="มัธยมศึกษาปีที่ 4">ม.4</option>
            <option value="มัธยมศึกษาปีที่ 5">ม.5</option>
            <option value="มัธยมศึกษาปีที่ 6">ม.6</option>
          </Select>
          <Button type="submit" colorScheme='purple'>ค้นหา</Button>
          </HStack>
        </form>

        <Wrap spacing='30px' mt={3}>
          {data.map(element => {
            let date = element['date'];
            let author = element['author'];
            let question = element['question'];
            let tags = element['tags'];
            let answer = element['answer'];

            return (
              <QuestionCard date={date} author={author} question={question} tags={tags} answer={answer}/>
            )
          })}
        </Wrap>
      </Container>
    </div>
  );
}

export default App;
