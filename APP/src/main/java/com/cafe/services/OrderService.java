package com.cafe.services;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cafe.entity.Bill;
import com.cafe.entity.Order;
import com.cafe.entity.OrderItem;
import com.cafe.entity.Product;
import com.cafe.entity.TransactionDetails;
import com.cafe.repository.BillRepository;
import com.cafe.repository.Order1Repository;
import com.cafe.repository.OrderItemRepository;
import com.cafe.repository.OrderRepository;
import com.cafe.repository.ProductRepository;
import com.razorpay.RazorpayClient;

@Service
@Transactional
public class OrderService {
	
	private static final String KEY = "rzp_test_BsCL4MHT2UPLIw";
	private static final String KEY_SECRET = "F83Dsml1Lp5u0Kj3OkuoB3m2";
	private static final String CURRENCY = "INR";
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private BillRepository billRepository;

    public void placeOrderWithItemsAndGenerateBill(Order order, List<OrderItem> orderItems) {
        // Step 1: Save the order
        orderRepository.save(order);

        // Step 2: For each order item, set the order and product, and save
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);

            // Fetch the product from the database (assuming you have a product ID)
            Product product = productRepository.findById(orderItem.getProduct().getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));

            // Set the product and calculate subtotal
            orderItem.setProduct(product);
            orderItem.setSubtotal(product.getPrice() * orderItem.getQuantity());

            // Save the order item
            orderRepository.save(orderItem);
        }

        // Step 3: Optionally, you can update the total amount of the order based on order item subtotals
        double totalAmount = orderItems.stream().mapToDouble(OrderItem::getSubtotal).sum();
        order.setTotalAmount(totalAmount);

        // Save the order with updated total amount
        orderRepository.save(order);

        // Step 4: Generate a bill for the order
        generateBill(order);
    }

    private void generateBill(Order order) {
        // Calculate the total amount based on order items
        double totalAmount = order.getOrderItems().stream()
                .mapToDouble(OrderItem::getSubtotal)
                .sum();

        // Create a new Bill entity
        Bill bill = new Bill();
        bill.setTotalAmount(totalAmount);
        bill.setOrder(order);

        // Save the bill
        billRepository.save(bill);

        // Set the bill in the order
        order.setBill(bill);

        // Update the order to reflect the bill association
        orderRepository.save(order);
    }
    public TransactionDetails createTransaction(Double amount) {
    	try {
    		
    		JSONObject jsonObject = new JSONObject();
    		jsonObject.put("amount", amount*100);
    		jsonObject.put("currency", CURRENCY);
    		
    	RazorpayClient razorpay = new RazorpayClient(KEY, KEY_SECRET);
    	com.razorpay.Order order  =razorpay.orders.create(jsonObject);
    	
    	return prepareTransactionDetails(order);
    	
    	}catch(Exception e) {
    		System.out.println(e.getMessage());
    	}
    	return null;
    }
    private TransactionDetails prepareTransactionDetails(com.razorpay.Order order) {
    	String orderId = order.get("id");
    	String currency = order.get("currency");
    	Integer amount = order.get("amount");
    	
    	TransactionDetails transactionDetails = new TransactionDetails(orderId, amount, currency);
    	return transactionDetails;
    }
    
    public List<Order> fetchAll() {
        return orderRepository.findAll();
    }
    public List<OrderItem> fetchAllItems() {
        return orderItemRepository.findAll();
    }
    
    @Transactional
    public void updateOrderStatus(Long orderId, String action) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

         //Perform dynamic status update based on action
        switch (action.toLowerCase()) {
            case "delivered":
                order.setStatus(Order.Status.DELIVERED);
                break;
            case "cancelled":
                order.setStatus(Order.Status.CANCELLED);
                break;
            // Add more cases as needed for other actions
            default:
                throw new IllegalArgumentException("Invalid action");
    }
        

        orderRepository.save(order);
    }

//	public List<OrderItem> fetchOrderByUserId(int userId) {
//		
//		return orderItemRepository.findByUserId( userId);
//	}
}
