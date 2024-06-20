package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;

    @Temporal(TemporalType.DATE)
    private Date issueDate;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

    private double totalAmount;

    private double amountPaid;

    private String status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private UserAccount customer;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    public Invoice() {
    }

    public Invoice(Date issueDate, Date dueDate, double totalAmount, double amountPaid, String status, UserAccount customer, Booking booking) {
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.totalAmount = totalAmount;
        this.amountPaid = amountPaid;
        this.status = status;
        this.customer = customer;
        this.booking = booking;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserAccount getCustomer() {
        return customer;
    }

    public void setCustomer(UserAccount customer) {
        this.customer = customer;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Invoice invoice)) return false;
        return Double.compare(invoice.getTotalAmount(), getTotalAmount()) == 0 && Double.compare(invoice.getAmountPaid(), getAmountPaid()) == 0 && Objects.equals(getInvoiceId(), invoice.getInvoiceId()) && Objects.equals(getIssueDate(), invoice.getIssueDate()) && Objects.equals(getDueDate(), invoice.getDueDate()) && Objects.equals(getStatus(), invoice.getStatus()) && Objects.equals(getCustomer(), invoice.getCustomer()) && Objects.equals(getBooking(), invoice.getBooking());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getInvoiceId(), getIssueDate(), getDueDate(), getTotalAmount(), getAmountPaid(), getStatus(), getCustomer(), getBooking());
    }

    @Override
    public String toString() {
        return "Invoice{" +
                ", issueDate=" + issueDate +
                ", dueDate=" + dueDate +
                ", totalAmount=" + totalAmount +
                ", amountPaid=" + amountPaid +
                ", status='" + status + '\'' +
                ", customer=" + customer +
                ", booking=" + booking +
                '}';
    }
}
