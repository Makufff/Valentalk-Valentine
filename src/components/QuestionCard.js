import {Wrap , WrapItem , Badge , Box, HStack , Heading , Text , Divider } from '@chakra-ui/react';

const QuestionCard = (props) => {
    const {question , tags , answer , date , author} = props;

    return (
        <WrapItem>
            <Box p={4} maxH='300px' w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' bg='white' className="blog-box">
            <Heading size='sm' mb={3}>{question}</Heading>
            <Divider mb={3}/>
            <Wrap>
                <HStack className="tags-box">    
                    <WrapItem>
                        <Badge colorScheme='purple'>{tags}</Badge>
                    </WrapItem>
                </HStack>
            </Wrap>
            <Text mt={3} mb={3} className="answer-box-">
                <div className="answer-box">
                {answer}
                </div>
            </Text>
            <Text color='gray.400' size='xs'>
                {date} โดย {author}
            </Text>
            </Box>
        </WrapItem>
    )
};

export default QuestionCard;