import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react';
import icons  from '@/constants/icons';
import { router, usePathname } from 'expo-router';



interface SearchInputProps {
  initialQuery: string;
}

const SearchInput = ({ initialQuery }: SearchInputProps) => {
 
  const pathname = usePathname()
  const [query, setquery] = useState(initialQuery||'')
  

  return (
   
      <View className='w-full h-16 rounded-2xl border-2 bg-background px-4 border-black-200 flex flex-row items-center focus:border-secondary'>
        
        <TextInput
        className='flex-1 font-psemibold text-white text-base pt-5'
          
          value={query}
          onChangeText={(e)=> setquery(e)}
          placeholder="Search for a product"
         placeholderTextColor="#263238"
         placeholderClassName=''
        
        />

       
          <TouchableOpacity onPress={()=>{
            if(query===''){
              Alert.alert("Empty query",'Please enter a query to search')
            }
            if(pathname.startsWith('/search')) 
              router.setParams({query})
            else
            router.push(`/search/${query}` as any)
          }}>
            <Image
            className='w-6 h-6'
            source={icons.search}
            resizeMode='contain'
            />
          </TouchableOpacity>
        

      </View>
        
      
    
  )
}

export default SearchInput

