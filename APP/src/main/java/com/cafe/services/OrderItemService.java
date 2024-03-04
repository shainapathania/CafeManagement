//package com.cafe.services;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.cafe.Exception.OrderItemNotFoundException;
//import com.cafe.Exception.OrderNotFoundException;
//import com.cafe.Exception.ProductNotFoundException;
//import com.cafe.dto.OrderItemDTO;
//import com.cafe.entity.OrderItem;
//import com.cafe.repository.OrderItemRepository;
//import com.cafe.repository.OrderRepository;
//import com.cafe.repository.ProductRepository;
//
//@Service
//public class OrderItemService {
//
//    @Autowired
//    private OrderItemRepository orderItemRepository;
//
//    @Autowired
//    private OrderRepository orderRepository;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    public OrderItem addOrderItem(OrderItemDTO orderItemDTO) throws OrderNotFoundException, ProductNotFoundException {
//        OrderItem orderItem = new OrderItem();
//        orderItem.setOrder(orderRepository.findById(orderItemDTO.getOrderId())
//                .orElseThrow(() -> new OrderNotFoundException("Order not found")));
//        orderItem.setProduct(productRepository.findById(orderItemDTO.getProductId())
//                .orElseThrow(() -> new ProductNotFoundException("Product not found")));
//        orderItem.setQuantity(orderItemDTO.getQuantity());
//        orderItem.setSubtotal(orderItemDTO.getSubtotal());
//
//        return orderItemRepository.save(orderItem);
//    }
//
//    public List<OrderItem> getAllOrderItems() {
//        return orderItemRepository.findAll();
//    }
//
//    public OrderItem getOrderItemById(Long orderItemId) throws OrderItemNotFoundException {
//        return orderItemRepository.findById(orderItemId)
//                .orElseThrow(() -> new OrderItemNotFoundException("OrderItem not found"));
//    }
//
//    public void deleteOrderItem(Long orderItemId) throws OrderItemNotFoundException {
//        OrderItem orderItem = getOrderItemById(orderItemId);
//        orderItemRepository.delete(orderItem);
//    }
//
//    // You can add more methods based on your requirements
//}
