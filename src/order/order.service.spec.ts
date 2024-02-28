import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderEnum, UpdateOrderDto } from './dto/order.dto';
import { KnexModule } from 'nestjs-knex';
import { OrderController } from './order.controller';
// Mock the service


describe('OrderService', () => {
    let service: OrderService;
    let controller: OrderController;
 

   

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                KnexModule.forRootAsync({
                    useFactory: () => ({
                        config: {
                            client: "pg",
                            useNullAsDefault: true,
                            connection: {
                                host: 'localhost',
                                user: 'postgres',
                                port: "5434",
                                password: '123',
                                database: 'nest',
                            },
                        },
                    }),
                }),
            ],
            providers: [
                {provide: OrderService,
                    useValue: {
                        create: jest.fn(),
                        findById: jest.fn(),
                        update:jest.fn(),
                        delete:jest.fn(),
                     }
                },
             
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
        
    });
  describe("delete",()=>{
        it('should delete the intended row by input id', async () => {
            const expectedEntity = { id: 1 };
           
            // Mock service behavior
            (service.delete as jest.Mock).mockResolvedValue(expectedEntity);
            
        
            const result = await service.delete(1);
        
            expect(service.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual(expectedEntity);
          });
     })

    // describe("update",()=>{
    //     it('should update the input value by id', async () => {
    //         const expectedEntity = { id: 1, title: 'updated Entity' }
    //         let orderUpdate: UpdateOrderDto = {
    //             title: 'lorem',
    //             description: 'lorem',
    //             status: OrderEnum.ACTIVE,
    //             estimate: 1,
    //         };
    //         // Mock service behavior
    //         (service.update as jest.Mock).mockResolvedValue(expectedEntity);
            
        
    //         const result = await service.update(1,orderUpdate);
        
    //         expect(service.update).toHaveBeenCalledWith(1,orderUpdate);
    //         expect(result).toEqual(expectedEntity);
    //       });
    //  })

//  describe("findById",()=>{
//     it('should return the found entity by id', async () => {
//         const expectedEntity = { id: 2, title: 'Test Entity' };
//         // Mock service behavior
//         (service.findById as jest.Mock).mockResolvedValue(expectedEntity);
        
    
//         const result = await service.findById(1);
    
//         expect(service.findById).toHaveBeenCalledWith(1);
//         expect(result).toEqual(expectedEntity);
//       });
//  })
  
    // describe("create", () => {
    //     it("should be create order ", async () => {
    //         let orderCreate: CreateOrderDto = {
    //             description: 'lorem',
    //             estimate: 1,
    //             status: OrderEnum.ACTIVE,
    //             title: 'lorem',
    //         }
    //         let expectedEntity = {
    //             id:2          
    //         };
  
    //         (service.create as jest.Mock).mockResolvedValue(expectedEntity);
    //         const result = await service.create(orderCreate);
    //         expect(service.create).toHaveBeenCalledWith(orderCreate)
    //         expect(result).toEqual(expectedEntity);           
    //     }); 

      
    // })
});
