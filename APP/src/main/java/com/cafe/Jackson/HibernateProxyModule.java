//package com.cafe.Jackson;
//
//import com.fasterxml.jackson.core.JsonGenerator;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.JsonSerializer;
//import com.fasterxml.jackson.databind.SerializerProvider;
//import com.fasterxml.jackson.databind.module.SimpleModule;
//import com.fasterxml.jackson.databind.ser.Serializers;
//
//import java.io.IOException;
//
//import org.hibernate.proxy.HibernateProxy;
//
//public class HibernateProxyModule extends SimpleModule {
//
//    @Override
//    public void setupModule(SetupContext context) {
//        super.setupModule(context);
//        context.addSerializers( new HibernateProxySerializer());
//    }
//
//    private static class HibernateProxySerializer extends JsonSerializer<HibernateProxy> {
//        @Override
//        public void serialize(HibernateProxy value, JsonGenerator gen, SerializerProvider serializers)
//                throws IOException, JsonProcessingException {
//            // Extract the real object from the Hibernate proxy
//            Object originalObject = value.getHibernateLazyInitializer().getImplementation();
//            serializers.defaultSerializeValue(originalObject, gen);
//        }
//    }
//}
