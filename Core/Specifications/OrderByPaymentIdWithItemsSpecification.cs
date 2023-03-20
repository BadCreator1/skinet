using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIdSpecification(string paymentIntentId)
        : base(o => o.PaymentIntentId==paymentIntentId){

        }
    }
}